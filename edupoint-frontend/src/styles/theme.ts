import { createTheme } from '@mui/material/styles';
import { colors, spacing, fontSize, boxShadow, borderRadius, mobileFontSize } from './constants';

const buttonStyles = {
  textTransform: 'none',
  borderRadius: borderRadius.round,
  fontWeight: 600,
  fontSize: fontSize.md,
  padding: `${spacing.xs} ${spacing.xl}`,
  background: colors.primary,
  color: colors.white,
  letterSpacing: '1px',
  '&:hover': {
    backgroundColor: colors['primary-lt'],
  },
  '@media (max-width:768px)': {
    fontSize: fontSize.sm,
    padding: `${spacing.xs} ${spacing.md}`,
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
    MuiTypography: {
      styleOverrides: {
      h1: {
        '@media (max-width:768px)': {
        fontSize: mobileFontSize.xxl,
        },
      },
      h2: {
        '@media (max-width:768px)': {
        fontSize: mobileFontSize.xl,
        },
      },
      h3: {
        '@media (max-width:768px)': {
        fontSize: mobileFontSize.lg,
        },
      },
      h4: {
        '@media (max-width:768px)': {
        fontSize: mobileFontSize.md,
        },
      },
      h5: {
        '@media (max-width:768px)': {
        fontSize: mobileFontSize.lg,
        },
      },
      h6: {
        '@media (max-width:768px)': {
        fontSize: mobileFontSize.xs,
        },
      },
      body1: {
        '@media (max-width:768px)': {
        fontSize: mobileFontSize.md,
        },
      },
      body2: {
        '@media (max-width:768px)': {
        fontSize: mobileFontSize.sm,
      },
    },
      },
    },
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
      defaultProps: {
        size: window.innerWidth < 768 ? 'small' : 'medium',
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
        textAlign: 'center',
        paddingBottom: 0,

        '@media (max-width:768px)': {
          fontSize: mobileFontSize.lg,
          paddingTop: spacing.sm,
          },
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
          '@media (max-width:768px)': {
            padding: `${spacing.sm} 0`,
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: fontSize.md,
          '@media (max-width:768px)': {
            fontSize: mobileFontSize.md,
            padding: `0 ${spacing.sm}`,
          },
        },
      },
    }
  },
});

export default theme;
