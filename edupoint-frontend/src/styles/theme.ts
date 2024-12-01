import { createTheme } from '@mui/material/styles';
import { colors, spacing, fontSize, boxShadow, borderRadius } from './constants';

const theme = createTheme({
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h1: { fontWeight: 400, fontSize: fontSize.xxl, lineHeight: 1.2 },
    h2: { fontWeight: 400, fontSize: fontSize.xl, lineHeight: 1.3 },
    h3: { fontWeight: 600, fontSize: fontSize.lg, lineHeight: 1.4 },
    h4: { fontWeight: 500, fontSize: fontSize.md, lineHeight: 1.5 },
    h5: { fontWeight: 500, fontSize: fontSize.sm, lineHeight: 1.6 },
    h6: { fontWeight: 300, fontSize: fontSize.xs, lineHeight: 1.7 },
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
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 0,
          '&:last-child': {
            paddingBottom: 0,
          },
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
          marginTop: spacing.xs,
          width: '100%',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          marginTop: spacing.xs,
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
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: borderRadius.lg,
          boxShadow: boxShadow.lg,
          padding: spacing.md,
          backgroundColor: colors.white,
          width: '90%', 
          maxWidth: '600px', 
        },
        paperFullWidth: {
          width: '100%',
        },
        paperFullScreen: {
          width: '100%',
          height: '100%',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
      root: {
        fontSize: fontSize.lg,
        fontWeight: 500,
        margin: ` 0 0 ${spacing.md}`,
        borderBottom: `1px solid ${colors['gray']}`,
      },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
      root: {
        fontSize: fontSize.md,
      },
      },
    },
  },
});

export default theme;
