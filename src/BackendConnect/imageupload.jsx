 const uploadImage = async (image)=> {
 if (!image) {
      console.error('No image selected');
      return;
    }
    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await fetch('http://127.0.0.1:5000/predict_skin_condition', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } 
    } catch (error) {
      return error
    }
}

const fetchDiseaseInfo = async (diseaseName, severityLevel) => {
    if (!diseaseName) {
      setError('Please provide a disease name');
      return;
    }

    const queryParams = new URLSearchParams({
      disease_name: diseaseName,
      severity_level: severityLevel,
    }).toString();

    try {
      const response = await fetch(`http://127.0.0.1:5000/get_disease_info?${queryParams}`, {
        method: 'GET',
      });

      if (!response.ok) {
         new Error('Failed to fetch disease information');
      }

      const data = await response.json();
      if (data.error) {
        return data.error;
      }
      return data

    } catch (err) {
      setError(err.message);
    }
  };

export {uploadImage, fetchDiseaseInfo}