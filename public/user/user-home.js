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
    userTitle.innerHTML = `Hey ${userInfo.name}`;
}


const getAllPosts = async () => {
    try {
        const response = await fetch(`${baseUrl}/posts`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        const responseWithJson = await response.json();
        renderPostUI(responseWithJson.data);
        console.log(responseWithJson);
    } catch (error) {
        console.log(error);
    }
}

const renderPostUI = (posts) => {
    for (let i = 0; i < posts.length; i++) {
        userPosts.innerHTML += `
        <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="..." alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${posts[i].title}</h5>
            <h6 class="card-title">${posts[i].subTitle}</h6>
            <p class="card-text">${posts[i].description}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
        </div>
        `
    }
}

getUserInfo();
getAllPosts();
