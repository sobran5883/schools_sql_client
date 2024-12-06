import MenuItem from './MenuItem';
import { FaSchool } from "react-icons/fa";
import { MdAddHomeWork } from "react-icons/md";

function Header() {
  return (
    <div className='w-full flex justify-center my-10'>
        <div className='w-10/12 flex justify-between'>
            <MenuItem title="Schools" address="/" Icon={FaSchool}/>
            <MenuItem title="Add School" address="/add" Icon={MdAddHomeWork}/>
        </div>
    </div>
  )
}

export default Header;