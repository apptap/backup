var shouldKeepChecking = true,
isLoadingPage = false;

var views = {
    formsInit: function () {
        $('form:not(.ignore)').each(function () {
            $(this).validate({
                submitHandler: function (form)
                {
                    event.stopPropagation();
                    var method = $(form).attr('name'),
                    formName = $(form).attr('data-name'),
                    relatedContentNodeId = $(form).attr('data-relatedContentNodeId');

                    $(form).addClass('loading');
                    $('.error-msg').remove();

                    models.submission(method, $(form).serialize(), formName, relatedContentNodeId).success(function (data) {
                        //console.log(data);
                        controllers.getSubmission(data);
                    });
                    return false;
                }
            });
        });
        //$('form:not(.ignore)').submit(function (event) {

        //    return false;
        //});
    },
    searchInit: function () {
        $('.grid-view').each(function () {
            var pageSize = parseInt($(this).attr('data-pageSize'));
            var results = parseInt($(this).find(".jTotalResults").attr('data-results'));
            if (results <= pageSize) {
                $(this).find('#IndexChecker').hide();
            }
            if (results == 0) {
                $(this).hide();
                $(this).next().css("margin-top", "20px")
            }
        });
        isLoadingPage = false;
        $("#checkboxes label").on('click touch', function () {
            event.stopPropagation();
            var grid = $('.grid-view');
            var filters = "";
            var $checkbox = $(this).parent().find("input[type='checkbox']");
            if (grid.attr('data-filter').length) {
                var filters = grid.attr('data-filter');
                if ($checkbox.is(":checked")) {
                    if (filters.indexOf(',' + $checkbox.val()) != -1) {
                        filters = filters.replace(',' + $checkbox.val(), "");
                    }
                    else {
                        filters = filters.replace($checkbox.val(), "");
                    }
                }
                else {
                    filters += ',' + $checkbox.val();
                }
            }
            else {
                filters += $checkbox.val();
            }
            grid.attr('data-filter', filters);
            controllers.dataProcessor(0, true, null);
        });
        $(".jTabFilter a").on("click touch", function () {
            event.preventDefault();
            var gridId = $(this).closest(".jTabFilter").attr("data-gridId");
            var grid = $('#' + gridId);
            var filters = $(this).attr('data-id');
            $('.grid-view').attr('data-filter', filters);
            controllers.dataProcessor(0, true, null, grid);
        });
        if ($('.jSearch').length > 0) {
            $('.jSearch').on("click touch", function () {
                event.stopPropagation();
                var r = $(this).closest(".regional");
                if (r.hasClass("open")) {
                    $("#q").blur();
                    r.removeClass("open");
                    r.find(".search-close").hide();
                }
                else {
                    r.addClass("open");
                    r.find(".search-close").show();
                    setTimeout(function () {
                        r.find("#q").focus();
                    }, 500);
                    $('.search-close').on("click touch", function () {
                        r.removeClass("open");
                        $(this).hide();
                    });
                }
            });
        }
        $('.filters select').change(function () {
            var grid = $('.grid-view');
            grid.attr('data-sort', $(this).val());
            controllers.dataProcessor(0, true, null);
        });
        if ($('.grid').length > 0) {
            for (i = 0; i < $('.grid').length; i++) {
                if (i == 0) {
                    new AnimOnScroll(document.getElementById('grid'), {
                        minDuration: 0.4,
                        maxDuration: 0.7,
                        viewportFactor: 0.2
                    });
                }
                else {
                    new AnimOnScroll(document.getElementById('grid' + i), {
                        minDuration: 0.4,
                        maxDuration: 0.7,
                        viewportFactor: 0.2
                    });
                }
            }
        }
    }
},
controllers = {
    startNextLoad: function (button) {
        event.preventDefault();
        var grid = $(button).closest(".grid-view");
        var currentPage = parseInt($(button).attr('data-pageidx')),
            nextPage = currentPage += 1;
        if (!isLoadingPage) {
            isLoadingPage = true;
            controllers.dataProcessor(nextPage, false, null, grid);
        }
    },
    dataProcessor: function (newPageIdx, replace, $form, grid) {
        if (grid == null) {
            $('.grid-view').each(function () {
                var gridId = $('#' + $(this).attr('id'));
                controllers.singleGridProcessor(newPageIdx, replace, $form, gridId);
            });
        }
        else {
            controllers.singleGridProcessor(newPageIdx, replace, $form, grid);
        }
        if ($('.scroll-too').length && $form != null) {
            var aTag = $("a[name='first-block']");
            $('html,body').animate({ scrollTop: (aTag.offset().top - 100) }, 'slow');
        }
    },
    singleGridProcessor: function (newPageIdx, replace, $form, grid) {
        var postData = "filter=" + grid.attr('data-filter');
        postData += "&colSize=" + grid.attr('data-col');
        postData += "&pageIdx=" + newPageIdx;
        if (grid.attr('data-pageSize').length > 0) {
            postData += "&pageSize=" + grid.attr('data-pageSize');
        }
        if (grid.attr('data-sort').length > 0) {
            postData += "&sort=" + grid.attr('data-sort');
        }
        if (grid.attr('data-include') != null && grid.attr('data-include').length > 0) {
            postData += "&includes=" + grid.attr('data-include');
        }
        if (grid.attr('data-exclude') != null && grid.attr('data-exclude').length > 0) {
            postData += "&excludes=" + grid.attr('data-exclude');
        }
        if ($form != null && $form.q.value.length > 0) {
            postData += "&term=" + $form.q.value;
        }
        else if ($("#SearchTerm").length && ($('#SearchTerm').val() != null && $('#SearchTerm').val() != "")) {
            postData += "&term=" + $('#SearchTerm').val();
        }
        grid.find('#IndexChecker').attr('data-pageidx', newPageIdx);
        models.searchPost(postData).success(function (data) {
            //console.log(data);
            controllers.loadMoreArticles(data, replace, newPageIdx, grid);
            var totalResults = 0;
            if ($('.jNumReplace').length) {
                $('.jNumReplace').each(function () {
                    var Results = $(this).closest(".grid-view").find(".jTotalResults").attr("data-results");
                    totalResults += parseInt(Results);
                    $(this).html(Results);
                });
            }
            else {
                totalResults = $(".jTotalResults").attr("data-results");
            }
            $('.jTotalReplace').html(totalResults);
        });
    },
    loadMoreArticles: function (data, replace, newPageIdx, grid) {
        var $content = $(data);
        var gridId = grid.find(".grid").attr('id');
        console.log($content.filter('div.item').length);
        grid.find('#IndexChecker').attr('data-pageidx', newPageIdx);
        if ($content.filter('div.item').length) {
            grid.show()
            if (replace) {
                grid.find('.grid').masonry('remove', grid.find('.grid').find('div.item')).html('').append($content).masonry('appended', $content.filter('div')).masonry('layout');
            } else {
                grid.find('.grid').append($content).masonry('appended', $content.filter('div'));
            }
            var totalResults = parseInt(grid.find(".jTotalResults").attr('data-results'));
            if ($content.filter('div.item').length == grid.attr('data-pageSize') || (newPageIdx == 0 && grid.find('.item').length < totalResults)) {
                grid.find('#IndexChecker').show();
            }
            else {
                grid.find('#IndexChecker').hide();
            }

            addthis.toolbox(grid.find('.grid'));

            //need to rewrite and/or fix this plugin!
            new AnimOnScroll(document.getElementById(gridId), {
                minDuration: 0.4,
                maxDuration: 0.7,
                viewportFactor: 0.2
            });
        } else {
            if (newPageIdx == 0) {
                grid.find('.grid').masonry('remove', grid.find('.grid').find('div'));
                grid.hide();
                grid.find(".jTotalResults").attr('data-results', 0);
            }
            shouldKeepChecking = false;
            grid.find('#IndexChecker').hide();
        }
        isLoadingPage = false;
    },
    getSubmission: function (data) {
        var form = $('.loading');
        if (data.indexOf("success") > -1) {
            var t = form.attr('data-title');
            var msg = form.attr('data-msg');
            form.addClass('success').removeClass('loading');
            form.parent().append('<div class="col-xs-12 text-center"><h3>' + t + '</h3><p>' + msg + '</p></div>');
            $('form input[type=text], form input[type=tel], form input[type=email], form textarea').each(function () {
                $(this).val('');
            });
            $('form input[type=checkbox]').each(function () {
                $(this).prop('checked', false);
                $(this).parent().removeClass('active');
            });
        }
        else {
            form.removeClass('loading');
            form.parent().append('<p class="error-msg">An error occurred. Please try again</p>');
        }
    }
},
models = {
    submission: function (method, d, formName, relatedContentNodeId) {
        var sb = { content: d, name: formName };

        if (relatedContentNodeId) {
            sb.relatedContentNodeId = relatedContentNodeId;
        }

        return $.ajax({
            url: '/umbraco/api/formapi/' + method,
            type: 'POST',
            dataType: 'json',
            processData: false,
            data: JSON.stringify(sb),
            contentType: "application/json",
            error: function (xhr, textStatus, errorThrown) {
                //
            }
        });
    },
    searchPost: function (postData) {
        return $.ajax({
            url: '/umbraco/Surface/CmsDataSurface/ArticleFilterSearch',
            type: 'POST',
            processData: false,
            data: postData,
            error: function (xhr, textStatus, errorThrown) {
                //do something sensible
            }
        });
    }
}

views.searchInit();
views.formsInit();