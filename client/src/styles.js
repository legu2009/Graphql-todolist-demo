import { injectGlobal } from 'react-emotion';
import space from './assets/images/0086.jpg';

export const unit = 8;
export const colors = {
  primary: '#220a82',
  secondary: '#14cbc4',
  accent: '#e535ab',
  background: '#f7f8fa',
  grey: '#d8d9e0',
  text: '#343c5a',
  textSecondary: '#747790'
};

export default () => injectGlobal({
  [['html', 'body']]: {
    height: '100%',
  },
  body: {
    margin: 0,
    padding: 0,
    fontFamily: '"Helvetica Neue", "Helvetica", sans-serif',
    backgroundColor: colors.background,
    color: colors.text,
  },
  '#root': {
    justifyContent: 'center',
    alignItems: 'flex-start',
    display: 'flex',
    minHeight: '100%',
    backgroundColor: '#f8f8f8',
    backgroundImage: `url(${space})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50%',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover'
  },
  '*': {
    boxSizing: 'border-box',
  },
  [['h1', 'h2', 'h3', 'h4', 'h5', 'h6']]: {
    margin: 0,
    fontWeight: 600,
  },
  h1: {
    fontSize: 48,
    lineHeight: 1,
  },
  h2: {
    fontSize: 40,
  },
  h3: {
    fontSize: 36,
  },
  h5: {
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 4,
  }
});
