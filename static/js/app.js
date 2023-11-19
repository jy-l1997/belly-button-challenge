const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function init() {
    let dropDown = d3.select('#selDataset');
    let id = dropDown.property('value');
    d3.json(url).then(function (data) {
        let names = data.names;
        let samples = data.samples;

        Object.values(names).forEach(value => {
            dropDown.append('option').text(value);
        })

        barPlot(names[0]);
        bubblePlot(names[0]);
        metadata(names[0]);
    })
};

d3.selectAll("#selDataset").on("change", getData);

function getData(){

    let dropDownMenu = d3.select("#selDataset");

    let idNum = dropDownMenu.property("value");

    barPlot(idNum);
    bubblePlot(idNum);
    metadata(idNum);
}

function barPlot(idNum){

    d3.json(url).then(function(data) {
        let samples = data.samples.filter(sample => sample.id == idNum);
        
        sampleValues = samples[0].sample_values;
        otuLabels = samples[0].otu_labels;
        otuIds = samples[0].otu_ids;

        // slice to top 10 highest since sampleValues is in descending order, then reverse so data is descending
        sampleValues = sampleValues.slice(0,10).reverse();
        otuLabels = otuLabels.slice(0,10).reverse();
        otuIds = otuIds.slice(0,10).reverse().map(i => 'OTU' + i) // add OTU to beginning of id #;

        let plotData = [
            {
                x: sampleValues,
                y: otuIds,
                text: otuLabels,
                labels: otuLabels,
                type: 'bar',
                orientation: 'h'
            }
        ];

        let layout = {
            xaxis: {title: 'Sample Values'},
            yaxis: {title: 'OTU ID'},
        }

        Plotly.newPlot("bar", plotData, layout);
    });

}

function bubblePlot(idNum){

    d3.json(url).then(function(data) {
        let samples = data.samples.filter(sample => sample.id == idNum);
        
        sampleValues = samples[0].sample_values;
        otuLabels = samples[0].otu_labels;
        otuIds = samples[0].otu_ids;

        let plotData = [
            {
                x: otuIds,
                y: sampleValues,
                text: otuLabels,
                marker: {
                    size: sampleValues,
                    color: otuIds,
                    colorscale: 'Picnic'
                },
                mode: 'markers'
            }
        ];

        let layout = {
            xaxis: {title: 'OTU ID'},
            yaxis: {title: 'Sample Values'},
        }

        Plotly.newPlot("bubble", plotData, layout);
    });

}

function metadata(idNum){

    d3.json(url).then(function(data) {
        let metadata = data.metadata.filter(sample => sample.id == idNum)[0];
        
        let panel = d3.select("#sample-metadata");
        panel.html("");
        
        for (k in metadata){
            panel.append("h6").text(`${k}: ${metadata[k]}`);
        };
        
    });

}

init();