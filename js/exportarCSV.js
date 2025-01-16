function exportToCSV(data) {
    var csvData = [];
    var headers = data.getColumnLabel(0) + "," + data.getColumnLabel(1);
    csvData.push(headers);

    for (var i = 0; i < data.getNumberOfRows(); i++) {
      var row = data.getValue(i, 0) + "," + data.getValue(i, 1);
      csvData.push(row);
    }

    var csvString = csvData.join("\n");
    var blob = new Blob([csvString], { type: "text/csv" });
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "ventas.csv";
    link.click();
  }