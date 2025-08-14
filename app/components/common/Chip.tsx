// TagPill.tsx
import { Chip, ChipProps, darken } from "@mui/material";

export const chipTheme = {
  default: { bg: "#F4F6F8", border: "#E1E5EA", text: "#44546F" },
  info: { bg: "#EFF6FF", border: "#B9E6FE", text: "#1E3A8A" },
  success: { bg: "#E8F5E9", border: "#B7E4C7", text: "#2E7D32" },
  warning: { bg: "#FFF7E0", border: "#FFE2A8", text: "#B26B00" },
  error: { bg: "#FFE7EB", border: "#FFCCD5", text: "#B72136" },
};

export type ChipStateKey = keyof typeof chipTheme;

export type Severity = ChipStateKey;

interface CustomChipProps extends Omit<ChipProps, "color" | "size"> {
  /** semantic color preset */
  severity?: Severity;
  /** custom override */
  color?: {
    bg: string;
    border?: string;
    text?: string;
  };
  size?: "compact" | "small" | "medium";

}


export default function CustomChip({
  severity = "default",
  color,
  icon,
  label,
  size = "small",
  sx,
  ...rest
}: CustomChipProps) {
  const { bg, text } = color ?? chipTheme[severity];

  const compact = size === "compact";

  return (
    <Chip
      icon={icon}
      label={label}
      size={compact ? "small" : size}
      deleteIcon={<span style={{ fontSize: 12, marginTop: -2 }}>×</span>}
      onDelete={rest.onDelete}
      sx={{
        fontSize: compact ? 10 : 12,
        height: compact ? 18 : 24,

        bgcolor: bg,
        color: text,
        border: `1px solid ${text}`,
        borderRadius: 2,
        "& .MuiChip-icon": {
          fontSize: compact ? 14 : 18,
          mr: compact ? 0.25 : 0.5,
        },
        "& .MuiChip-deleteIcon": {
          color: text,
          ml: compact ? 0.25 : 0.75,
          ":hover": { color: darken(text ?? 'inherit', 0.2) },
        },
        ...sx,
      }}
      {...rest}
    />
  );
}
