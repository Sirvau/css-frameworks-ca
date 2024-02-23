
import {apiV2_BaseUrl, apiV2_Posts} from "../constants.mjs";
import { authFetch } from "../fetch.mjs";



/**
 * 
 * @returns 
 */


 //Get Posts function
export async function getPosts() {

    const response = await authFetch(`${apiV2_BaseUrl}${apiV2_Posts}`);

    if (response.ok) {
        const postData = await response.json();
        console.log(postData); 
        return postData;

    } else {
        throw new Error("Failed to fetch posts");
    }
}

 

export async function displayPosts() {
    try {
        const postData = await getPosts();
        console.log("postData:", postData);
        const postFeedContainer = document.getElementById("nav-feed");

       
            postData.data.forEach(post => {

              
                //Maincontainers
                const postMainContainer = document.createElement("div");
                postMainContainer.classList.add("container", "my-5");

                const postSecondMainContainer = document.createElement("a");
                postSecondMainContainer.href = "#";
                postSecondMainContainer.classList.add("row", "border", "rounded");

                //Image and tags 
                const postImageAndTagContainer = document.createElement("div");
                postImageAndTagContainer.classList.add("col-sm-4", "my-2");

                if (post.media && post.media.url) {
                  
               
                    const postImage = document.createElement("img");
                    postImage.src = post.media.url;
                    postImage.alt = post.media.alt || ""; 
                    postImage.classList.add("img-thumbnail");
                    postImageAndTagContainer.appendChild(postImage);

                }

                //Title and body text 
                const postTitleAndBodyContainer = document.createElement("div");
                postTitleAndBodyContainer.classList.add("col-sm-7", "col-md-8", "my-2");

                const postTitle = document.createElement("h2");
                postTitle.textContent = post.title;
                postTitle.classList.add("h4", "primary-font", "text-light");

                const postBodyText = document.createElement("p");
                postBodyText.textContent = post.body;
                postBodyText.classList.add("secondary-font", "text-light");

                //Author and follow button
                const postAuthorAndFollowButtonContainer = document.createElement("div");
                postAuthorAndFollowButtonContainer.classList.add("d-flex", "justify-content-start", "justify-content-md-center", "ms-3", "ms-md-0");


                //Appending to containers
                postFeedContainer.appendChild(postMainContainer);
                postMainContainer.appendChild(postSecondMainContainer);

                postSecondMainContainer.appendChild(postImageAndTagContainer);
                postSecondMainContainer.appendChild(postTitleAndBodyContainer);
                postSecondMainContainer.appendChild(postAuthorAndFollowButtonContainer);

                postTitleAndBodyContainer.appendChild(postTitle); 
                postTitleAndBodyContainer.appendChild(postBodyText);

              

            });
    
    } catch (error) {
        console.error("Error displaying posts:", error.message);
    }
}

function displayTopButton() {
    try {
        const mainContainer = document.getElementById("to-top-feed-button-container");
               
        const toTopLinkButton = document.createElement("a");
        toTopLinkButton.href = "#header-feed-page";
        toTopLinkButton.classList.add("btn", "btn-primary", "border-secondary", "secondary-font");
        toTopLinkButton.setAttribute("id", "btn-to-top");
        toTopLinkButton.textContent = "To top ";

        const arrowIcon = document.createElement("i");
        arrowIcon.classList.add("fa-solid", "fa-angle-up");

        mainContainer.appendChild(toTopLinkButton);
        toTopLinkButton.appendChild(arrowIcon);
    } catch (error) {
        console.error("Error displaying button", error.message);
    }
}

displayTopButton();



 