import App from './App';
import { mount, shallow } from 'enzyme';
import Student from './component/Student';

it("renders without crashing", () => {
  shallow(<App />);
});

it("<App /> renders <Student /> components without crashing", () => {
  mount(<App />);
});


