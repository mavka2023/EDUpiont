import { createTheme } from '@mui/material/styles';
import { colors, spacing, fontSize, boxShadow, borderRadius } from './constants';

const buttonStyles = {
  textTransform: 'none',
  borderRadius: borderRadius.round,
  fontWeight: 600,
  fontSize: fontSize.md,
  padding: `${spacing.sm} ${spacing.xxl}`,
  background: colors.primary,
  color: colors.white,
  letterSpacing: '1px',
  '&:hover': {
    backgroundColor: colors['primary-lt'],
  },
}

const theme = createTheme({
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h1: { fontWeight: 300, fontSize: fontSize.xl, lineHeight: 1.2, color: colors['font-header'], fontFamily: "Jaro", letterSpacing: '3px' },
    h2: { fontWeight: 400, fontSize: fontSize.xxl, lineHeight: 1.3, color: colors['font-header']  },
    h3: { fontWeight: 600, fontSize: fontSize.lg, lineHeight: 1.4, color: colors['font-header']  },
    h4: { fontWeight: 600, fontSize: fontSize.md, lineHeight: 1.5, color: colors['font-header']  },
    h5: { fontWeight: 500, fontSize: fontSize.lg, lineHeight: 1.6, color: colors['font-header']  },
    h6: { fontWeight: 300, fontSize: fontSize.xs, lineHeight: 1.7, color: colors['font-header']  },
    body1: { fontSize: fontSize.md, lineHeight: 1.5, color: colors['font-body']  },
    body2: { fontSize: fontSize.sm, lineHeight: 1.5, color: colors['font-body']  },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          ...buttonStyles as any
        },
        contained: {
          backgroundColor: colors.primary,
          color: colors.white,
          '&:hover': {
            backgroundColor: colors['primary-lt'],
          },
        },
        outlined: {
          borderColor: colors.primary,
          background: 'none',
          color: colors.primary,
          '&:hover': {
            backgroundColor: `${colors.primary}`,
            color: colors.white,
          },
        },
        sizeSmall: {
          fontSize: fontSize.sm,
          padding: `${spacing.xs} ${spacing.md}!important`,
        }
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.xl,
          boxShadow: boxShadow.md,
          width: '100%',
          backgroundColor: colors.white,
          border: `2px solid ${colors['gray-dk']}`,
          padding: 0,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: spacing.md,
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: `${spacing.sm} ${spacing.md}`,
          backgroundColor: colors['gray'],
          width: '100%',
          'border-bottom': `2px solid ${colors['gray-dk']}`,
          'span': {
            fontSize: fontSize.md,
            fontWeight: 600,
          }
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
          borderRadius: `${borderRadius.lg}!important`,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          width: '100%',
          marginTop: spacing.xs,
          borderRadius: `${borderRadius.lg}!important`,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          marginTop: spacing.xs,
          width: '100%',
          borderRadius: `${borderRadius.lg}!important`,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          width: '100%',
          borderRadius: `${borderRadius.lg}!important`,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: borderRadius.lg,
          boxShadow: boxShadow.lg,
          padding: spacing.sm,
          backgroundColor: colors.white,
          width: '90%', 
          maxWidth: '1000px', 
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
        fontSize: fontSize.xxl,
        fontWeight: 500,
        // borderBottom: `1px solid ${colors['gray']}`,
        textAlign: 'center',
        paddingBottom: 0,
      },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
      root: {
        padddingTop: spacing.sm,
        paddingBottom: 0,
        fontSize: fontSize.md,
        color: colors['font-body'],
        textAlign: 'center',
      },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: spacing.md,
          justifyContent: 'center',
          '> button': {
            margin: spacing.sm,
            ...buttonStyles
          },
        },
      },
    }
  },
});

export default theme;
