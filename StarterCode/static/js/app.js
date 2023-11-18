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
        barGraphs(names[0])
    })
};

function barGraphs(idNum){

    d3.json(url).then(function(data) {
        let samples = data.samples;
        console.log(samples);

        // let index = data.find({id} => id === idNum);
        
        index = 0 ; // get rid of later
        sampleValues = samples[index].sample_values;
        otuLabels = samples[index].otu_labels;
        otuIds = samples[index].otu_ids;

        // slice to top 10 highest since sampleValues is in descending order
        sampleValues = sampleValues.slice(0,9);
        otuLabels = otuLabels.slice(0,9);
        otuIds = 'OTU ' + otuIds.slice(0,9); // only adding to 1st element?

        let plotData = [
            {
                x: sampleValues,
                y: otuIds,
                text: otuLabels,
                labels: otuLabels,
                type: 'bar',
                orientation: 'h'
            }
        ]
        console.log(otuIds)
        Plotly.newPlot("bar", plotData);
    });

}

init();