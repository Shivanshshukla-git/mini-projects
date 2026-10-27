const form= document.querySelector("form");
const userName= document.querySelector("#userName");
const userRole= document.querySelector("#userRole");
const userBio= document.querySelector("#userBio");
const pic= document.querySelector("#photoUrl");
const container= document.querySelector("#profilesContainer");

const userManager= {
    users: JSON.parse(localStorage.getItem("profiles")) || [],

    initialize: function(){
        form.addEventListener("submit", this.submitForm.bind(this));

        this.renderProfiles();
    },

    submitForm: function(detail){
        detail.preventDefault();

        this.addUser();

        this.saveUsers();
    },

    addUser: function(){
        const cleanedName = userName.value.trim();
        const cleanedRole = userRole.value.trim();
        const cleanedBio = userBio.value.trim();

        if (cleanedName === "" || cleanedRole === "" || cleanedBio === "") {
            alert("Form Error: Input fields cannot contain only empty spaces!");
            return;                                 // Stops the function immediately
        }

        this.users.push({
            nameInput: cleanedName,
            roleInput: cleanedRole,
            bioInput: cleanedBio,
            picInput: pic.value
        });

        form.reset();

        this.renderProfiles();
    },

    saveUsers: function () {
        localStorage.setItem("profiles", JSON.stringify(this.users));
    },

    renderProfiles: function(){
        container.innerHTML= "";

        this.users.forEach((user, index)=> {
            const card= document.createElement("div");
            card.className= "user-profile-card";

            // Delete Btn -
            const deleteBtn= document.createElement("button");
            deleteBtn.className= "delete-btn";
            deleteBtn.textContent= "×";
            card.appendChild(deleteBtn);

            deleteBtn.addEventListener("click", ()=> {
                this.removeUser(index);
            })

            // Image - 
            const img= document.createElement("img");
            img.className= "user-profile-card-img";
            img.src= user.picInput;
            img.alt= `${user.nameInput}'s photo`;

            img.onerror = function() {
                img.onerror = null;                     // Immediately delete the listener to kill any potential loop!
                img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0NdK0b4mAaTvFcPk2WcFlvhw9K5Pk4Kmtx8kbzetvj0f0-gLOlCxncRE&s=10"; 
            };

            card.appendChild(img);

            // Name -
            const name= document.createElement("h3");
            name.className= "user-profile-card-h3";
            name.textContent= user.nameInput;
            card.appendChild(name);

            // Role - 
            const role= document.createElement("p");
            role.className= "user-profile-card-role";
            role.textContent= user.roleInput;
            card.appendChild(role);

            // Bio - 
            const bio= document.createElement("p");
            bio.className= "user-profile-card-bio";
            bio.textContent= user.bioInput;
            card.appendChild(bio);

            container.appendChild(card);
        })
    },

    removeUser: function(targetIndex){
        this.users.splice(targetIndex, 1);

        this.saveUsers();

        this.renderProfiles();
    }
};

userManager.initialize();