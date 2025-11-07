function selectMode(mode) {
  if (mode === "easy") {
    Swal.fire({
      title: "Easy Mode Selected!",
      text: "You have chosen Easy Mode. Good luck!",
      icon: "success",
      confirmButtonText: "Start Game",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "easyMode.html";
      }
    });
  }

  if (mode === "medium") {
    Swal.fire({
      title: "Medium Mode Selected!",
      text: "You have chosen Hard Mode. Brace yourself!",
      icon: "warning",
      confirmButtonText: "Start Game",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "mediumMode.html";
      }
    });
  }

  if (mode === "hard") {
    Swal.fire({
      title: "Hard Mode Selected!",
      text: "You have chosen Hard Mode. Good luck, you'll need it!",
      icon: "error",
      confirmButtonText: "Start Game",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "hardMode.html";
      }
    });
  }
}
