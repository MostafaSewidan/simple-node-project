// ADD FORM
$("#form").on("submit", function (e) {
  e.preventDefault();

  //   tinyMCE.triggerSave();

  var url = $(this).attr("action");
  var method = $(this).attr("method");

  $("#submit").prop("disabled", true);
  $("#submit").find(".spinner").toggle();
  $("#submit").find(".btn-title").toggle();
  $(".progress-info").show();
  $(".progress-bar").width("0%");
  resetErrors();

  axios
    .post(url, document.querySelector("#form"), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(function (data) {
      $("#submit").prop("disabled", false);
      $("#submit").find(".spinner").toggle();
      $("#submit").find(".btn-title").toggle();
      $("#submit").text();

      redirect(data);
      successfully(data);
      resetForm();
      resetErrors();
      $(".modal").modal("hide");
    })
    .catch(function (data) {
      $("#submit").prop("disabled", false);
      $("#submit").find(".spinner").toggle();
      $("#submit").find(".btn-title").toggle();
      displayErrors(data);
    });
});

// Update
$("#updateForm").on("submit", function (e) {
  e.preventDefault();
  tinyMCE.triggerSave();

  var url = $(this).attr("action");
  var method = $(this).attr("method");

  $.ajax({
    xhr: function () {
      var xhr = new window.XMLHttpRequest();
      xhr.upload.addEventListener(
        "progress",
        function (evt) {
          if (evt.lengthComputable) {
            var percentComplete = evt.loaded / evt.total;
            percentComplete = parseInt(percentComplete * 100);
            $(".progress-bar").width(percentComplete + "%");
            $("#progress-status").html(percentComplete + "%");
          }
        },
        false
      );
      return xhr;
    },

    url: url,
    type: method,
    dataType: "JSON",
    data: new FormData(this),
    contentType: false,
    cache: false,
    processData: false,

    beforeSend: function () {
      $("#submit").prop("disabled", true);

      $("#submit").find(".spinner").toggle();
      $("#submit").find(".btn-title").toggle();
      $(".progress-info").show();
      $(".progress-bar").width("0%");
      resetErrors();
    },
    success: function (data) {
      $("#submit").prop("disabled", false);
      $("#submit").text();

      if (data[0] == true) {
        redirect(data);
        successfully(data);
      } else {
        displayMissing(data);
      }
    },
    error: function (data) {
      $("#submit").prop("disabled", false);
      displayErrors(data);
    },
  });
});

// Alerts & Others
function displayErrors(data) {
  var getJSON = data.response.data;

  jQuery.each(getJSON.errors, function (index, value) {
    if (value.length !== 0) {
      $('[data-name="' + index + '"]')
        .parent()
        .addClass("has-error");
      $('[data-name="' + index + '"]')
        .closest(".form-group")
        .find(".help-block")
        .html(value);
      $('[data-name="' + index + '"]')
        .closest(".input-group")
        .find(".help-block")
        .html(value);
    }
  });

  var output = '<div><ul style="margin:0px">';
  for (var error in getJSON.errors) {
    output += "<li>" + getJSON.errors[error] + "</li>";
  }
  output += "</ul></div>";

  $("#result")
    .slideDown("fast", function () {
      $("#result").html(output);
      $(".progress-info").hide();
      $(".progress-bar").width("0%");
    })
    .delay(5000)
    .slideUp("slow");

  $(".progress-info").hide();
  $(".progress-bar").width("0%");
}

function formatRepoSelection(repo) {
  return repo.name || repo.text;
}

function formatRepo(repo) {
  if (repo.loading) return repo.text;

  var markup = repo.response;

  return markup;
}

function displayMissing(data) {
  toastr["error"](data[1]);
  $(".progress-info").hide();
  $(".progress-bar").width("0%");
  $("#kt_table_1").DataTable().ajax.reload();
}

function redirect(data) {
  if (data.url) {
    var url = data.response;

    if (url) {
      window.location.replace(url);
      // if (data["blank"] && data["blank"] == true) {
      //   window.open(url, "_blank");
      // } else {
      // }
    }
  }
}

function successfully(data) {
  toastr["success"](data.message);
  $(".progress-info").hide();
  $(".progress-bar").width("0%");
  $("#dataTable").DataTable().ajax.reload();
}

function resetForm() {
  // Clear Inputs
  $(".form-control").each(function () {
    $(this).val("");
  });

  // Clear tinyMCE Editor
  $("textarea").each(function (k, v) {});
}

function resetErrors() {
  $(".has-error").each(function () {
    $(this).removeClass("has-error");
  });

  $(".help-block").each(function () {
    $(this).text("");
  });
}

// DATATABLE
function CheckAll() {
  var isChecked = $("input[name=ids]").first().prop("checked");
  $("input[name=ids]").prop("checked", !isChecked);
}

function getFormData($form) {
  var unindexed_array = $form.serializeArray();
  var indexed_array = {};

  $.map(unindexed_array, function (n, i) {
    indexed_array[n["name"]] = n["value"];
  });

  return indexed_array;
}

$(document).ready(function () {
  $("#search").click(function () {
    var $form = $("#formFilter");
    var data = getFormData($form);

    console.log(data);
    $("#dataTable").DataTable().destroy();

    tableGenerate(data);
  });

  $(".filter-cancel").click(function () {
    document.getElementById("formFilter").reset();

    $("#dataTable").DataTable().destroy();

    $(".select2").val(null).trigger("change");

    tableGenerate();
  });

  initSwichery();
});

function initSingleSwitchery(elem) {
  var init = new Switchery(elem, { size: "small" });
}

// js switchery multiple
function initSwichery() {
  // var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
  // elems.forEach(function(html) {
  //     var switchery = new Switchery(html,{ size: 'small' });
  // });
}

function copyText(text) {
  navigator.clipboard.writeText(text);
  toastr["success"]("copied");
}
