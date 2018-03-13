$(document).ready
        (
        function() {
            $(".comment-sort").addClass("list-dropdown-enabled");

            $(".list-dropdown-icon").click(function() {
                var dropdown = $(this).parents(".list-dropdown-first").children(".list-dropdown-main");
                

                if (dropdown.is(":hidden")) {
                    dropdown.slideDown("fast");
                    $(this).parents(".top-option").addClass("expanded");
                }
                else {
                    dropdown.slideUp("fast");
                    $(".top-option").removeClass("expanded");
                }

            });
        }
        );