import {v2 as cloudinary} from 'cloudinary'

const connectCloudinary = async () => {
cloudinary.config({
  cloud_name: 'dj5icypiv',  
  api_key: '526722746615853',        
  api_secret: 'vjK93o6VRiyIla7Km72ZhsLXIgk', 
});
}
export default connectCloudinary;