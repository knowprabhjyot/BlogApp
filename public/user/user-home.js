const userTitle = document.getElementById('user-title');
const userPosts = document.getElementById('user-posts');
const baseUrl = 'http://localhost:1200/api/v1';
const token = localStorage.getItem('access-token');

function getUserInfo() {
    const userInfo = JSON.parse(localStorage.getItem('current-user'));
    
    if (!userInfo) {
        alert("You need to login to access this page!");
        window.location.href = "/user/user-login.html";
    }
    userTitle.innerHTML = `Hey ${userInfo.name} welcome to the blog App`;
}


const getAllPosts = async () => {
    try {
        fetch(`${baseUrl}/posts`, {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log(error);
    }
}

getUserInfo();
getAllPosts();
