const imgValidator = (image) => {
  // type of image is allowed :)
  const allowedExtension = [".png", ".jpg", ".jpeg", 'pdf'];
  let ret = { status: false, type: null };

  allowedExtension.map((type) => {
    if (image.name.includes(type)) {
      ret = { status: true, type: type };
    }
  });


  return ret;
};


const imgSizeValidator = (image) => {

}

module.exports = imgValidator;
