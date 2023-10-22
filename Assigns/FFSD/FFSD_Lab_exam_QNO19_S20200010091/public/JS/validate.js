function validateForm() {
    let name = document.adding_details.name.value;
    let gender = document.adding_details.gender.value;
    let age = document.adding_details.age.value;
    let satisfaction = document.adding_details.satisfaction.value;
    let benefiting = document.adding_details.benefiting.value;
  if (name == "") {
    alert("Name must be filled out");
    return false;
  }
  else if (gender == "") {
    alert("Gender must be filled out");;
    return false;
  }
  else if (satisfaction == "") {
      alert("Satisfaction must be filled out");
      return false;
  }
  else if (age == "") {
      alert("Age must be filled out");
      return false;
  }
  else if (benefiting == "") {
      alert("Benefiting must be filled out");
      return false;
  }
  else {
      return true
  }
}