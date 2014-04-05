/**
 * Created by anhnguyen on 4/1/14.
 */
(function($){

    $.fn.tabler = function(options) {

        function generateDataRow(tbody) {
            console.log(cached);
            if (cached.length > 0)
            {
                for(var i = 0; i < cached.length; i++)
                {
                    /* Generate a row with a set of columns */
                    var tr = $('<tr></tr>');
                    for (var j = 0; j < settings.columns.length; j++)
                    {
                        tr.append($('<td></td>'));
                    }
                    tr.append($('<td><a href="#" class="tabler-row-update">edit</a>&nbsp;&nbsp;&nbsp;<a href="#" class="tabler-row-delete">delete</a></td>'))

                    for (var k in cached[i])
                    {
                        var index = inAttrs.indexOf(k);
                        if (index != -1)
                        {
                            if (settings.columns[index].format != null && settings.columns[index].format != undefined)
                            {
                                if (settings.columns[index].link == null || settings.columns[index].link == undefined)
                                    $(tr.find('td')[index]).html('<span data-attr="value">' + settings.columns[index].format(cached[i][k]) + '</span>');
                                else
                                    $(tr.find('td')[index]).html(settings.columns[index].link.enabled == null || settings.columns[index].link.enabled == undefined || settings.columns[index].link.enabled == false ? '<span data-attr="value">' + settings.columns[index].format(cached[i][k]) + '</span>' : '<a data-attr="value" href="' + settings.columns[index].link.to + '">' + settings.columns[index].format(cached[i][k]) + '</a>');
                            }
                            else
                                if (settings.columns[index].link == null || settings.columns[index].link == undefined)
                                    $(tr.find('td')[index]).html('<span data-attr="value">' + cached[i][k] + '</span>');
                                else
                                    $(tr.find('td')[index]).html(settings.columns[index].link.enabled == null || settings.columns[index].link.enabled == undefined || settings.columns[index].link.enabled == false ? '<span data-attr="value">' + cached[i][k] + '</span>' : '<a data-attr="value" href="' + settings.columns[index].link.to +  '">' + cached[i][k] + '</a>');
                        }
                    }
                    /* Insert element to grid */
                    tbody.append(tr);
                }
            }
            else
            {
                tbody.append($('<tr><td colspan="' + (settings.columns.length+1) + '">No data</td></tr>'))
            }
        }

        var defaults = {
            columns : [],
            header_class: '',
            row_class: '',
            footer_class: '',
            data_url: '',
            update_url: '',
            delete_url: '',
            create_url: ''
        };

        var settings = $.extend(defaults, options);

        var el = $(this);
        var thead, tbody, tfoot;
        var cached = [];

        /* Initalizing Grid */
        if (settings.columns.length == 0)
            console.error('[error] No columns were specified');
        else
        {
            /* Generate basic elements for table */
            el.append($('<thead></thead>'));
            el.append($('<tbody></tbody>'));
            el.append($('<tfoot></tfoot>'));

            /* Generate header for table */
            var inAttrs = [];
            thead = el.find('thead:first');
            thead.append($('<tr></tr>'));
            var thr = thead.find('tr:first');
            thr.addClass(settings.header_class);
            for(var i = 0; i < settings.columns.length; i++)
            {
                thr.append($('<td width="' + settings.columns[i].width + '">' + settings.columns[i].title + '</td>'));
                inAttrs.push(settings.columns[i].name);
            }
            thr.append($('<td width="10%"></td>'));

            /* Put initial data to table rows */
            tbody = el.find('tbody:first');
        }

        /* Add pagination to footer */
        tfoot = el.find("tfoot:first");
        tfoot.append($('<tr class="' + settings.footer_class + '"></tr>'));
        var tftr = tfoot.find('tr:first');
        tftr.append($('<td colspan="' + (settings.columns.length+1) + '"><span><a href="#" id="tabler-new-item">new</a></span>&nbsp;&nbsp;<span><a href="#" id="tabler-nav-previous">previous</a></span>&nbsp;&nbsp;&nbsp;<span id="tabler-pages"><a href="#">1</a></span>&nbsp;&nbsp;&nbsp;<span><a href="#" id="tabler-nav-next">next</a></span></td>'))

        /* Event Handlers */
        $(el).on('click', '#tabler-new-item', function(e) {
            console.log(tbody.find('tr[data-attr=new-row]').length);
            if (tbody.find('tr[data-attr=new-row]').length < 1)
            {
                var tr = $('<tr data-attr="new-row"></tr>');
                for (var i = 0; i < settings.columns.length; i++)
                {
                    var ttd = $('<td></td>')

                    switch(settings.columns[i].type)
                    {
                        case 'text':
                            ttd.append('<input type="text" data-attr="value" />');
                            break;
                        case 'select':
                            var tselect = $('<select></select>');
                            for (var j = 0; j < settings.columns[i].list.length; j++)
                            {
                                tselect.append($('<option value="' + settings.columns[i].list[j][1] + '">' + settings.columns[i].list[j][1] + '</option>'))
                            }
                            ttd.append(tselect);
                            break;
                        default:
                            break;
                    }
                    tr.append(ttd);
                }
                tr.append($('<td><a href="#" class="tabler-new-row-save">save</a>&nbsp;&nbsp;<a href="#" class="tabler-new-row-delete">delete</a></td>'))
                tbody.append(tr);
            }
        });

        $(el).on('click', '.tabler-row-update', function(e){
            e.stopPropagation();

            var state = $(this).text();
            if (state == "edit")
            {
                $(this).text("save");
                state = "save";
            } else
            {
                $(this).text("edit");
                state = "edit";
            }

            var parent = $(this).parents('tr:first'),
                tds = $(parent).find('td');

            for (var i = 0; i < settings.columns.length; i++)
            {
                if (settings.columns[i].type != null && settings.columns[i].type != undefined)
                {
                    if (state == 'save')
                    {
                        $(tds[i]).find('[data-attr=value]').hide();

                        switch(settings.columns[i].type)
                        {
                            case 'text':
                                if ($(tds[i]).find('[data-attr=edit]').length == 1)
                                {
                                    $(tds[i]).find('[data-attr=edit] input')[0].value = $(tds[i]).find('[data-attr=value]')[0].innerText;
                                    $(tds[i]).find('[data-attr=edit]').show();
                                } else
                                {
                                    $(tds[i]).find('[data-attr=edit]').remove();
                                    $(tds[i]).append('<span data-attr="edit"><input type="text" style="width:100%;" /></span>');
                                    $(tds[i]).find('[data-attr=edit] input')[0].value = $(tds[i]).find('[data-attr=value]')[0].innerText;
                                    $(tds[i]).find('[data-attr=edit]').show();
                                }
                                break;
                            case 'select':
                                var select = $('<select></select>');
                                for (var j = 0; j < settings.columns[i].list.length; j++)
                                {
                                    select.append($('<option value="' + settings.columns[i].list[j][1] + '">' + settings.columns[i].list[j][1] + '</option>'))
                                }

                                if ($(tds[i]).find('[data-attr=edit]').length == 1)
                                {
                                    $(tds[i]).find('[data-attr=edit] select')[0].value = $(tds[i]).find('[data-attr=value]')[0].innerText;
                                    $(tds[i]).find('[data-attr=edit]').show();
                                } else
                                {
                                    var span = $('<span data-attr="edit"></span>');
                                    span.append(select);

                                    $(tds[i]).find('[data-attr=edit]').remove();
                                    $(tds[i]).append(span);
                                    $(tds[i]).find('[data-attr=edit] select')[0].value = $(tds[i]).find('[data-attr=value]')[0].innerText;
                                    $(tds[i]).find('[data-attr=edit]').show();
                                }
                                break;
                            default:
                                break;
                        }
                    } else if (state == 'edit')
                    {
                        switch(settings.columns[i].type)
                        {
                            case 'text':
                                $(tds[i]).find('[data-attr=value]')[0].innerText = $(tds[i]).find('[data-attr=edit] input')[0].value;
                                $(tds[i]).find('[data-attr=value]').show();
                                $(tds[i]).find('[data-attr=edit]').hide();
                                break;
                            case 'select':
                                console.log($(tds[i]).find('[data-attr=edit] select')[0].value);
                                $(tds[i]).find('[data-attr=value]')[0].innerText = $(tds[i]).find('[data-attr=edit] select')[0].value;
                                $(tds[i]).find('[data-attr=value]').show();
                                $(tds[i]).find('[data-attr=edit]').hide();
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
        });

        $(el).on('click', '.tabler-new-row-save', function(e){
            alert('saving new row');
        });

        $(el).on('click', '.tabler-new-row-delete', function(e){
            $(this).parents('tr:first').remove();
        });

        $(el).on('click', '.tabler-row-delete', function(e){
            e.stopPropagation();
            var dialogResult = confirm('Are you sure?');
            if (dialogResult)
            {
                if (settings.delete_url.length == 0)
                    console.error('[error] Delete url has not been specified');
                else
                {
                    $.post(settings.delete_url, {}, function(response) {
                        if (response.status == 'success')
                        {

                        } else
                            console.err('[error] The request was not successful');
                    }).error(function(){
                        console.error('[error] There was a problem when processing the request');
                    });
                }
            }
            else
                alert('cancelled');
        });

        // Populate data from data URL
        if (settings.data_url == null || settings.data_url.length == 0)
            console.error('[error] Data URL is required');
        else
        {
            $.get(settings.data_url, function(response) {
                if (response.status == 'ok')
                {
                    cached = response.data;
                    generateDataRow(tbody);
                } else
                    console.error('[error] ' + response.status);
            }).error(function(){
                console.error('[error] Unable to get data from specified data URL');
            });
        }


        this.refresh = function() {
            if (settings.data_url.length == 0)
                console.error('[error] Data URL has not been specified');
            else
            {
                // Do refresh
            }
        }

        return this;
    };

})(jQuery);
