/**
 * Created by anhnguyen on 4/1/14.
 */
(function($){

    $.fn.tabler = function(options) {
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

        /* Sample Data */
        var samples = [
            { uid: '0001',
              name: 'Default Task',
              type: 'feature',
              description: '02:18:39'
            },
            { uid: '0002',
                name: 'Extended Task',
                type: 'Bug',
                description: '00:12:00'
            }
        ]

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
            var thead = el.find('thead:first');
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
            var tbody = el.find('tbody:first');
            if (samples.length > 0)
            {
                for(var i = 0; i < samples.length; i++)
                {
                    /* Generate a row with a set of columns */
                    var tr = $('<tr></tr>');
                    for (var j = 0; j < settings.columns.length; j++)
                    {
                        tr.append($('<td></td>'));
                    }
                    tr.append($('<td><a href="#" class="tabler-row-update">update</a>&nbsp;&nbsp;&nbsp;<a href="#" class="tabler-row-delete">delete</a></td>'))

                    for (var k in samples[i])
                    {
                        var index = inAttrs.indexOf(k);
                        if (index != -1)
                        {
                            $(tr.find('td')[index]).html('<a href="#">' + samples[i][k] + '</a>')
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

        /* Add pagination to footer */
        var tfooter = el.find("tfoot:first");
        tfooter.append($('<tr class="' + settings.footer_class + '"></tr>'));
        var tftr = tfooter.find('tr:first');
        tftr.append($('<td colspan="' + (settings.columns.length+1) + '"><span><a href="#" id="tabler-nav-previous">previous</a></span>&nbsp;&nbsp;&nbsp;<span id="tabler-pages"><a href="#">1</a></span>&nbsp;&nbsp;&nbsp;<span><a href="#" id="tabler-nav-next">next</a></span></td>'))

        /* Event Handlers */
        $(el).on('click', '.tabler-row-update', function(e){
            e.stopPropagation();
            alert('clicking update anchor!');
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
