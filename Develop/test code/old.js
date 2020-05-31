
    let jsonLength = 0;

    function updateJsonLength() {
      fs.readFile(dbJson, (error, data) => {
        let userNote = req.body;
        userNote.id = storedNotes.length;

        jsonLength = userNote.id;
      });
    }
    updateJsonLength();

    $("#saveButton").on("click", () => {
      let userNoteTitle = $("#userNoteTitle").val();
      let userNoteBody = $("#userNoteBody").val();

      const noteObj = {
        id: jsonLength,
        title: userNoteTitle,
        text: userNoteBody
      };

      $.post("/api/notes", noteObj, () => {});
      $("#userNoteTitle").val("");
      $("#userNoteBody").val("");

      let appendText = `<p class="savedNote">${noteObj.title}</p>`
      $("savedNotes").append(appendText)
      updateJsonLength();
    })

    $(".savedNote").on("click", function() {
      let clickValue = $(this).val();

      fs.readFile(dbJson, (error, data) => {
        let json = JSON.parse(data);
        let noteBody = "";
        let noteTitle = "";

        json.forEach(element => {
          if (element.title === clickValue) {
            noteBody = element.text
            noteTitle = element.title
          }
        });

        $("userNoteTitle").val($(noteTitle));
        $("userNoteBody").val($(noteBody));
      });
    })

    $("#newNoteButton").on("click", () => {
      $("userNoteTitle").val("");
      $("userNoteBody").val("");
    })
