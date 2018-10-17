import React from 'react';
import renderer from 'react-test-renderer';
import HomeScreen from '../screens/HomeScreen';
import PedometerHomescreen from '../components/PedometerHomescreen';
import TodoHomescreen from '../components/TodoHomescreen';
import AppointmentModalHomescreen from '../components/AppointmentInfoHomescreenModal';
import ProfileModal from '../components/ProfileModal';

//testing snapshot view
// test('renders', () => {
//     const tree = renderer
//         .create(<PedometerHomescreen />)
//         .toJSON();
//     expect(tree).toMatchSnapshot();
// });

// component is rendered correctly
// test('renders button with passed props', () => {
//     const component = renderer.create(
//         <HomeScreen onClick={() => { }} label="test label" />
//     );
//     expect(component.toJSON()).toMatchSnapshot();
// });


// test('shallow test', () => {

//     const renderer = new ShallowRenderer(); renderer.render(<HomeScreen />);
//     const result = renderer.getRenderOutput();
//     expect(result.type).toBe("ImageBackground"); expect(result.props.children).toEqual([
//         <PedometerHomescreen />]);
// })


// const getDefaultProps = () => ({});
// describe('Risky component', () => {
//     it('shallow renders without crashing', () => {
//         const { } = getDefaultProps();
//         shallow(<HomeScreen />);
//     });
//     it('render snapshot', () => {
//         const { } = getDefaultProps();
//         const wrapper = render(<HomeScreen />);
//         expect(wrapper).toMatchSnapshot();
//     });
// });

