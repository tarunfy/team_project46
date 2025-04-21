'use client'

import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { AuthContext } from '@/context/authContext'
import { useContext, useEffect, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'  // Import useRouter
import {uploadImage, fetchDiseaseInfo} from "../../BackendConnect/imageupload"
import DisplayInfo from "../../components/info-format/index"

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Dashboard = () => {
  const { getUser } = useContext(AuthContext)
  const router = useRouter()  // Initialize router
  const [image, setImage] = useState(null);  
  const [imagePreview, setImagePreview] = useState(null); 
  const [diseaseName, setDiseaseName] = useState();
  const [severity, setSeverity] = useState()
  const [diseaseInfo, setDiseaseInfo] = useState();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImage(file); 
      setImagePreview(previewUrl);  
    }
  };
  
 const handleFreshStart = () => {
  setDiseaseName(null);
  setImage(null);
  setImagePreview(null);
  setSeverity(null);
  setDiseaseInfo(null);
 }
  const handleUpload = async () => {
    if (!image) {
      console.error('No image selected');
      toast.error("Please select an image")
      return;
    }
    const result = await uploadImage(image);
    const [d1, d2] = result.result.split(',');
    setDiseaseName(d1)
    setSeverity(d2)
    console.log(d1,"->", d2)
     const formData = new FormData();
    formData.append("file", image);

    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const uploadData = await uploadRes.json();
    console.log("Uploaded to Cloudinary:", uploadData.url);

    const cloudinaryImageUrl = uploadData.url;
    console.log(cloudinaryImageUrl)

  };
  
  const handleDiseaseData = async () =>{
    if(diseaseName == null || diseaseName == undefined){
      toast.error("no disease choosen")
    }
    const data = await fetchDiseaseInfo(diseaseName, severity);
    setDiseaseInfo(data.disease_info);
    console.log(data);
  }

  useEffect(() => {
    const user = getUser()
    console.log(user)
    if (user == null) {
      console.log('myVar is null or undefined')
      router.push('/login')  
    }
  }, [getUser, router])  

  return (
    <div className="h-screen w-full bg-white">
      <SidebarTrigger />
      <div className="flex flex-col w-full justify-center items-center">
        {/* Image preview */}
        {imagePreview && (
          <div className="mb-4">
            <Image src={imagePreview} alt="Preview" width={200} height={200} />
          </div>
        )}

        {/* File input */}
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          className="mb-4"
        />

        {/* Upload button */}
        <Button 
          onClick={handleUpload} 
          disabled={!image}  // Disable the button if no image is selected
        >
          Upload Image
        </Button>
        {diseaseName && !diseaseInfo &&  <Button onClick={handleDiseaseData }>Get Info</Button>}
        {diseaseName &&  <p>{diseaseName} and the level of severity is {severity}</p>}
        {diseaseInfo && <div className='p-4'><DisplayInfo content={diseaseInfo}/></div>}
        {diseaseInfo && <div className='flex flex-row p-4'><Button onClick={handleFreshStart}>Try again</Button> <p>or</p> <Button>Start Tracking</Button></div>}
      </div>
    </div>
  )
}

export default Dashboard
