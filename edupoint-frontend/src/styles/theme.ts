import { createTheme } from '@mui/material/styles';
import { colors, spacing, fontSize, boxShadow, borderRadius } from './constans';

const theme = createTheme({
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h1: { fontWeight: 700, fontSize: fontSize.xxl, lineHeight: 1.2 },
    h2: { fontWeight: 700, fontSize: fontSize.xl, lineHeight: 1.3 },
    h3: { fontWeight: 600, fontSize: fontSize.lg, lineHeight: 1.4 },
    h4: { fontWeight: 600, fontSize: fontSize.sm, lineHeight: 1.5 },
    h5: { fontWeight: 500, fontSize: fontSize.sm, lineHeight: 1.6 },
    h6: { fontWeight: 500, fontSize: fontSize.xs, lineHeight: 1.7 },
    body1: { fontSize: fontSize.md, lineHeight: 1.5 },
    body2: { fontSize: fontSize.sm, lineHeight: 1.5 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: borderRadius.md,
          fontWeight: 600,
          padding: `${spacing.sm} ${spacing.md}`,
        },
        contained: {
          backgroundColor: colors.primary,
          color: colors.white,
          '&:hover': {
            backgroundColor: colors.text,
          },
        },
        outlined: {
          borderColor: colors.primary,
          color: colors.primary,
          '&:hover': {
            backgroundColor: `${colors.primary}33`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.lg,
          boxShadow: boxShadow.md,
          padding: spacing.md,
          width: '100%',
          backgroundColor: colors.white,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          color: colors.primary,
          fontWeight: 500,
          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          width: '100%',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          width: '100%',
        },
      },
    }
  },
});

export default theme;
