import renderer from 'react-test-renderer';
import Header from '../Header';

describe('Header', () => {
    test('Header page renders as expected', async () => {
      const snapHeader = renderer.create(
        <Header/>
      )
        .toJSON();
      expect(snapHeader).toMatchSnapshot();
    });
  });