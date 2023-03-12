//get all items
const addForm = document.getElementById("member-add-form");
const alertBox = addForm.querySelector(".alert-box");
const name = addForm.querySelector("input#name");
const email = addForm.querySelector("input#email");
const cell = addForm.querySelector("input#cell");
const image = addForm.querySelector("input#image");
const skill = addForm.querySelector("select#skill");
const role = addForm.querySelector("select#role");
const members = document.getElementById("team-member-list");

/**
 * Get Skill list from API
 */

let skillList = [];
axios.get(`http://localhost:5050/skill`).then((res) => {
	let data = res.data;
	data.map((data) => {
		skillList += `
        <option value="${data.id}" >${data.name}</option>
        
        `;
	});
	skill.insertAdjacentHTML("beforeend", skillList);
});

/**
 * Get Role list from API
 */

let roleList = [];
axios.get("http://localhost:5050/role").then((response) => {
	let data = response.data;
	data.map((data) => {
		roleList += `
        <option value= "${data.id}">${data.name}</option>
        `;
	});
	role.insertAdjacentHTML("beforeend", roleList);
});

/**
 * Form data validation
 * Send Post Request to REST API by AXIOS
 * DATA store to API
 */

addForm.addEventListener("submit", function (e) {
	e.preventDefault();
	if (name.value == "" || email.value == "" || cell.value == "" || skill.value == "" || role.value == "") {
		alertBox.innerHTML = alertMassage("All fields are required", "danger");
	} else {
		axios
			.post("http://localhost:5050/developer", {
				id: "",
				name: name.value,
				email: email.value,
				cell: cell.value,
				image: image.value,
				roleId: role.value,
				skillId: skill.value,
			})
			.then((res) => {
				alertBox.innerHTML = alertMassage("Team member added successfully", "success");
				addForm.reset();

				let memberList = "";
				axios.get(`http://localhost:5050/developer`).then((response) => {
					let teamMember = response.data;
					teamMember.map((data, index) => {
						memberList += `
                           <tr>
								<td>${index + 1}</td>
								<td>${data.name}</td>
								<td>${data.email}</td>
								<td>${data.cell}</td>
								<td>${data.roleId}</td>
								<td>${data.skillId}</td>
								<td>
									<img
										width="50px"
										src="${data.image}"
										alt="Team member" />
								</td>
								<td>
									<button class="btn btn-sm btn-outline-success"><i class="fa fa-eye"></i> view</button>
									<button class="btn btn-sm btn-outline-info"><i class="fa fa-edit"></i> edit</button>
									<button class="btn btn-sm btn-outline-danger"><i class="fa fa-trash"></i> delete</button>
								</td>
							</tr>
            
                          `;
					});
					members.innerHTML = memberList;
				});
			});
	}
});

/**
 * Get all team member data from REST API
 * Send Get request to server
 * Show all data to data table
 */
let memberList = "";
function getTeamMember() {
	axios.get(`http://localhost:5050/developer`).then((response) => {
		let teamMember = response.data;
		teamMember.map((data, index) => {
			memberList += `
            <tr>
								<td>${index + 1}</td>
								<td>${data.name}</td>
								<td>${data.email}</td>
								<td>${data.cell}</td>
								<td>${data.roleId}</td>
								<td>${data.skillId}</td>
								<td>
									<img
										width="50px"
										src="${data.image}"
										alt="Team member" />
								</td>
								<td>
									<button class="btn btn-sm btn-outline-success"><i class="fa fa-eye"></i> view</button>
									<button class="btn btn-sm btn-outline-info"><i class="fa fa-edit"></i> edit</button>
									<button class="btn btn-sm btn-outline-danger"><i class="fa fa-trash"></i> delete</button>
								</td>
							</tr>
            
            `;
		});
		members.innerHTML = memberList;
	});
}

getTeamMember();
