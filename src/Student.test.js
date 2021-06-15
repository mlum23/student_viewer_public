import Student from './component/Student';
import { shallow } from 'enzyme';

var mockStudent = {
    firstName: "Bob",
    lastName: "Smith",
    id: "999",
    grades: [100, 50, 95],
    skill: "Developer",
    email: "test@test.test",
    tags: ["red", "blue"]
}

it("renders <Student /> with props without crashing", () => {
    shallow(<Student {...mockStudent} />);
});

it("<Student /> initial button is +", () => {
    const wrapper = shallow(<Student {...mockStudent} />);
    const button = wrapper.find('.display-grade-button');
    expect(button.text()).toBe('+');
})

it("<Student /> click on '+' changes to '-'", () => {
    const wrapper = shallow(<Student {...mockStudent} />);
    wrapper.find('.display-grade-button').simulate('click');
    expect(wrapper.find('.display-grade-button').text()).toBe('-');
});