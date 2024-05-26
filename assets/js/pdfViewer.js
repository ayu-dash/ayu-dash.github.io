var { pdfjsLib } = globalThis;
    const url = `../assets/pdf/${fileName}`;

    const reader = document.querySelector('#reader');

    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.mjs';

    var thePDF = null;
    var currPage = 1;
    var numPages = 0;

    pdfjsLib.getDocument(url).promise.then(function(pdf) {
        thePDF = pdf

        numPages = pdf.numPages;

        pdf.getPage(1).then(handlePages)
    });

    function handlePages(page) {
        var viewport = page.getViewport( {scale: 1.5} );

        var canvas = document.createElement( "canvas" );
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        page.render({canvasContext: context, viewport: viewport});

        reader.appendChild( canvas );

        currPage++;
        if ( thePDF !== null && currPage <= numPages )
        {
            thePDF.getPage( currPage ).then( handlePages );
        }
    }