import renderer from 'react-test-renderer';
import App from '../../App';

describe('App', () => {
    test('App page renders as expected', async () => {
      const snapApp = renderer.create(
        <App/>
      )
        .toJSON();
      expect(snapApp).toMatchSnapshot();
    });
  });
  