/* eslint-env jquery */
const apiUrl = 'https://api.punkapi.com/v2/beers';

$.getJSON(apiUrl, function (data) {
    let initialData = data;
    let clickedItem = null;
    let modal = $('#itemDetailsModal');

    Display(initialData);

    $('#sortById').on('click', function () {
        initialData.sort(function (a, b) {
            return a.id - b.id;
        });
        $('.item-row').remove();
        if ($(this).hasClass('asc')) {
            $('.asc').removeClass('asc');
            $('.desc').removeClass('desc');
            initialData.reverse();
            Display(initialData);
            $(this).addClass('desc');
        } else {
            $('.asc').removeClass('asc');
            $('.desc').removeClass('desc');
            Display(initialData);
            $(this).addClass('asc');
        }
    });

    $('#sortByName').on('click', function () {
        initialData.sort(function (a, b) {
            return a.name.toUpperCase().localeCompare(b.name.toUpperCase());
        });
        $('.item-row').remove();
        if ($(this).hasClass('asc')) {
            $('.asc').removeClass('asc');
            $('.desc').removeClass('desc');
            initialData.reverse();
            Display(initialData);
            $(this).addClass('desc');
        } else {
            $('.asc').removeClass('asc');
            $('.desc').removeClass('desc');
            Display(initialData);
            $(this).addClass('asc');
        }
    });

    $('#sortByDescription').on('click', function () {
        initialData.sort(function (a, b) {
            return a.description.toUpperCase().localeCompare(b.description.toUpperCase());
        });
        $('.item-row').remove();
        if ($(this).hasClass('asc')) {
            $('.asc').removeClass('asc');
            $('.desc').removeClass('desc');
            initialData.reverse();
            Display(initialData);
            $(this).addClass('desc');
        } else {
            $('.asc').removeClass('asc');
            $('.desc').removeClass('desc');
            Display(initialData);
            $(this).addClass('asc');
        }
    });

    $('#filterByName').on('keyup', function (e) {
        if (e.keyCode === 46 || e.keyCode === 8) {
            $(this).val('');
            $('.item-row').show();
        } else {
            let value = $(this).val();
            let itemHide = $('.item-row').not("[name*='" + value + "']");
            if (value) {
                if (itemHide) {
                    itemHide.hide();
                }
            }
        }
    });

    function Display (list) {
        let items = list.map(item =>
            `
                <tr class="item-row" name="${item.name}" id="${item.id}" data-toggle="modal" data-target="#itemDetailsModal">
                    <td class="text-center">${item.id}</td>
                    <td>
                        <div class="item-wrapper text-center">
                            <h4 class="item-name">
                                ${item.name}
                            </h4>
                            <figure class="figure item-img-wrapper">
                                <img class="figure-img" src="${item.image_url}" alt="${item.name} - ${item.tagline}">
                            </figure>
                        </div>
                    </td>
                    <td>
                        <p class="item-description">
                            ${item.description}
                        </p>
                        <p>
                            <strong>Alcohol:</strong> ${item.abv}%
                        </p>
                    </td>
                </tr>
            `);
        $('.list-items').append(items);
    }

    $('.item-row').on('click', function () {
        clickedItem = $(this).attr('id');
    });

    modal.on('show.bs.modal', function () {
        clickedItem--;
        let currentItem = initialData[clickedItem];
        $.each(currentItem, function (key, value) {
            $('.modal-body').append('<strong>' + key + '</strong>' + ': ' + value + '<br>');
        });
    });

    modal.on('hidden.bs.modal', function () {
        $('.modal-body').empty();
    });
});
