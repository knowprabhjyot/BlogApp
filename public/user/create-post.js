
const baseUrl = 'http://localhost:1200/api/v1';

const createPost = async (event) => {
    event.preventDefault();
    const title = document.getElementById('title');
    const subTitle = document.getElementById('subTitle');
    const description = document.getElementById('description');
    const imageFile = document.getElementById('image');
    const token = localStorage.getItem('access-token');

   const data = await fetch(`${baseUrl}/posts`, {
        method: "POST",
        body: JSON.stringify({
            title: title.value,
            subTitle: subTitle.value,
            description: description.value,
            image: imageFile.files[0],
        }),
        headers: {
            'Content-Type': "application/json",
            'Authorization' : `Bearer ${token}`
        }
    });


    const responseData = await data.json();

    console.log(responseData);
}