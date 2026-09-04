$.ajaxSetup({
    beforeSend: function beforeSend(xhr, settings) {
        function getCookie(name) {
            let cookieValue = null;


            if (document.cookie && document.cookie !== '') {
                const cookies = document.cookie.split(';');

                for (let i = 0; i < cookies.length; i += 1) {
                    const cookie = jQuery.trim(cookies[i]);

                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) === (`${name}=`)) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }

            return cookieValue;
        }

        if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
            // Only send the token to relative URLs i.e. locally.
            xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
        }
    },
});
$(document)
    .on("click", ".js-toggle-modal", function(e) {
        e.preventDefault();
        $(".js-modal").toggleClass("hidden");
    })

    .on("click", ".js-submit", function(e) {
        e.preventDefault();

        const $btn = $(this);
        const $textarea = $(".js-post-text");
        const text = $textarea.val().trim();
        const $label = $btn.find("span");

        if (!text.length) {
            return false;
        }

        $btn.prop("disabled", true);
        $label.text("Posting!");

        $.ajax({
            type: "POST",
            url: $textarea.data("post-url"),

            data: {
                text: text
            },

            success: function(dataHtml) {
                $(".js-modal").addClass("hidden");

                $(".post-container").prepend(dataHtml);

                $textarea.val("");

                $btn.prop("disabled", false);
                $label.text("Create Post");
            },

            error: function(xhr) {
                console.error(xhr.responseText);

                $btn.prop("disabled", false);
                $label.text("Error");
            }
        });
    });