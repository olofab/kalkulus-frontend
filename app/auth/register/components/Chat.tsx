import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Skeleton,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation'
import { apiPublicPost } from '../../../lib/api'

type Question = {
  id: string;
  getQuestion: (answers: Answers) => string;
  field: keyof Answers;
  placeholder: string;
  type?: 'text' | 'email' | 'password';
};

type Answers = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  companyName?: string;
  orgNumber?: string;
};

const questions: Question[] = [
  {
    id: 'firstName',
    getQuestion: () => 'Hva er ditt fornavn?',
    field: 'firstName',
    placeholder: 'Fornavn',
  },
  {
    id: 'lastName',
    getQuestion: (a) => `Hei ${a.firstName ?? ''}, hva er ditt etternavn?`,
    field: 'lastName',
    placeholder: 'Etternavn',
  },
  {
    id: 'email',
    getQuestion: (a) =>
      `Hei ${a.firstName} ${a.lastName}, hva er e-postadressen din?`,
    field: 'email',
    placeholder: 'epost@firma.no',
    type: 'email',
  },
  {
    id: 'password',
    getQuestion: () => 'Velg et passord',
    field: 'password',
    placeholder: 'Passord',
    type: 'password',
  },
  {
    id: 'confirmPassword',
    getQuestion: () => 'Gjenta passordet',
    field: 'confirmPassword',
    placeholder: 'Gjenta passord',
    type: 'password',
  },
  {
    id: 'companyName',
    getQuestion: (a) => `Hva heter firmaet ditt, ${a.firstName}?`,
    field: 'companyName',
    placeholder: 'Firmanavn',
  },
  {
    id: 'orgNumber',
    getQuestion: () => 'Hva er organisasjonsnummeret?',
    field: 'orgNumber',
    placeholder: 'Organisasjonsnummer',
  },
];

const ProfileChat: React.FC = () => {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState('');
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiLoading, setApiLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const current = questions[step];
  const currentValue = input.trim();

  const handleNext = () => {
    if (!currentValue) return;

    // Spesialhåndtering for passordbekreftelse
    if (
      current.field === 'confirmPassword' &&
      currentValue !== answers.password
    ) {
      setShowPasswordError(true);
      setInput('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
      return;
    }

    setShowPasswordError(false);

    const updatedAnswers = {
      ...answers,
      [current.field]: currentValue,
    };

    setAnswers(updatedAnswers);
    setInput('');
    setIsThinking(true);

    setTimeout(() => {
      if (step < questions.length - 1) {
        setStep((prev) => prev + 1);
        setIsThinking(false);
        setTimeout(() => {
          inputRef.current?.focus();
        }, 10);
      } else {
        setSubmitted(true);
        setIsThinking(false);
      }
    }, 300);
  };

  // Når chatten er ferdig, kall API for registrering
  useEffect(() => {
    if (submitted) {
      const register = async () => {
        setApiLoading(true);
        setApiError(null);
        try {
          const data = {
            name: `${answers.firstName} ${answers.lastName}`,
            email: answers.email,
            password: answers.password,
            companyName: answers.companyName,
            organizationNumber: answers.orgNumber,
            industry: '', // Sett denne til valgt bransje hvis du har det, ellers tom streng
          }
          const res = await apiPublicPost('/api/auth/register-company', data)
          localStorage.setItem('token', res.token)
          router.push('/auth/result?status=success')
        } catch (err: any) {
          const errorMsg = err?.response?.data?.error || 'Ukjent feil'
          setApiError(errorMsg)
          setTimeout(() => {
            router.push(`/auth/result?status=fail&error=${encodeURIComponent(errorMsg)}`)
          }, 1200)
        } finally {
          setApiLoading(false);
        }
      }
      register()
    }
  }, [submitted, answers, router])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          mt: 3
        }}
      >
        {/* Logo */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Avatar src="/timla_logo_blue.svg" alt="logo" sx={{ width: 48, height: 48 }} variant='square' />
        </Box>

        {/* Chat history */}
        <Box sx={{ flex: 1, mb: 3 }}>
          {questions.slice(0, step).map((q) => {
            const value = answers[q.field];
            const questionText = q.getQuestion(answers);
            return (
              <Box key={q.id} sx={{ mb: 2 }}>
                <Typography fontWeight="bold" mb={0.5}>
                  {questionText}
                </Typography>
                {value && (
                  <Box
                    sx={{
                      backgroundColor: '#007aff',
                      color: 'white',
                      px: 2,
                      py: 1,
                      borderRadius: 20,
                      ml: 'auto',
                      maxWidth: '80%',
                      wordBreak: 'break-word',
                      width: 'fit-content',
                    }}
                  >
                    {q.type === 'password' ? '••••••••' : value}
                  </Box>
                )}
              </Box>
            );
          })}

          {/* Chat feedback for feil passord */}
          {showPasswordError && (
            <Box sx={{ mb: 2 }}>
              <Box
                sx={{
                  backgroundColor: '#e53935',
                  color: 'white',
                  p: 0.5,
                  px: 2,
                  borderRadius: 20,
                  width: 'fit-content',
                  height: 'fit-content',
                }}
              >
                <Typography>
                  Passordene er ikke like. Prøv igjen.
                </Typography>
              </Box>
            </Box>
          )}

          {/* API error feedback */}
          {apiError && (
            <Box sx={{ mb: 2 }}>
              <Typography fontWeight="bold" mb={0.5}>
                Registrering feilet
              </Typography>
              <Box
                sx={{
                  backgroundColor: '#e53935',
                  color: 'white',
                  px: 2,
                  py: 1,
                  borderRadius: 20,
                  maxWidth: '80%',
                  width: 'fit-content',
                }}
              >
                {apiError}
              </Box>
            </Box>
          )}

          {/* New question: show Skeleton or fade-in question */}
          <AnimatePresence mode="wait">
            {!submitted && (
              <motion.div
                key={current.id + (isThinking ? '_skeleton' : '_question')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{ marginBottom: '16px' }}
              >
                {isThinking ? (
                  <Skeleton variant="text" width="70%" height={30} />
                ) : (
                  <Typography fontWeight="bold" mb={0.5}>
                    {current.getQuestion(answers)}
                  </Typography>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </Box>

        {/* Input and button */}
        {!submitted ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              type={current.type ?? 'text'}
              placeholder={current.placeholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleNext()}
              disabled={isThinking}
              inputRef={inputRef}
              sx={{
                flex: 3,
                borderRadius: 99,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 99,

                  height: 48,
                },
              }}
            />
            <Button
              variant="contained"
              color='primary'
              onClick={handleNext}
              disabled={!currentValue || isThinking}
              sx={{
                flex: 1,
                height: 48,
                borderRadius: 99,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: 16,
                minWidth: 0,
                px: 0,
              }}
            >
              Neste
            </Button>
          </Box>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Typography variant="h6" textAlign="center" mt={2}>
              {apiLoading
                ? 'Registrerer bruker...'
                : apiError
                  ? 'Noe gikk galt'
                  : `Takk, ${answers.firstName}! Kontoen din er klar 🎉`
              }
            </Typography>
          </motion.div>
        )}
      </Box>
    </motion.div>
  );
};

export default ProfileChat;
