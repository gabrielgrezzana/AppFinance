import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { createTheme } from "@shopify/restyle";

const palette = {
    // Cores do tema claro
    light: {
      primary: DefaultTheme.colors.primary,
      background: DefaultTheme.colors.background,
      card: DefaultTheme.colors.card,
      text: DefaultTheme.colors.text,
      border: DefaultTheme.colors.border,
      notification: DefaultTheme.colors.notification,
      // Suas cores customizadas
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
    },
    // Cores do tema escuro
    dark: {
      primary: DarkTheme.colors.primary,
      background: DarkTheme.colors.background,
      card: DarkTheme.colors.card,
      text: DarkTheme.colors.text,
      border: DarkTheme.colors.border,
      notification: DarkTheme.colors.notification,
      // Suas cores customizadas
      success: '#059669',
      warning: '#D97706',
      error: '#DC2626',
    },
  };

  const createAppTheme = (isDark: boolean) => createTheme({
    colors: {
      // Usando as cores do React Navigation
      primary: isDark ? palette.dark.primary : palette.light.primary,
      background: isDark ? palette.dark.background : palette.light.background,
      cardBackground: isDark ? palette.dark.card : palette.light.card,
      text: isDark ? palette.dark.text : palette.light.text,
      textSecondary: isDark ? '#9CA3AF' : '#6B7280',
      border: isDark ? palette.dark.border : palette.light.border,
      
      // Suas cores extras
      success: isDark ? palette.dark.success : palette.light.success,
      warning: isDark ? palette.dark.warning : palette.light.warning,
      error: isDark ? palette.dark.error : palette.light.error,
    },
    spacing: {
      xs: 4,
      s: 8,
      m: 16,
      l: 24,
      xl: 32,
      xxl: 48,
    },
    borderRadii: {
      s: 4,
      m: 8,
      l: 16,
      xl: 24,
    },
    textVariants: {
      header: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'text',
      },
      subheader: {
        fontWeight: '600',
        fontSize: 18,
        color: 'text',
      },
      body: {
        fontSize: 16,
        color: 'text',
      },
      caption: {
        fontSize: 12,
        color: 'textSecondary',
      },
      defaults:{
        
      }
    },
    cardVariants: {
      primary: {
        backgroundColor: 'cardBackground',
        borderRadius: 'm',
        padding: 'm',
        shadowColor: 'text',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
    },
  });

  export const lightTheme = createAppTheme(false);
  export const darkTheme = createAppTheme(true);

  export type Theme = typeof lightTheme;