function calculate(){

    // Get answers
    let answers = new Array(50);
    for (let i=0; i<50; i++) {
        let answer_id = "answer_" + i;
        answers[i] = document.getElementById(answer_id).value;
    }
    //console.log("Answer to question: " + answers);
    
    // Scale answers to mean 0 and unit variance
    // Hardcode mean and variance of each question reponse to rescale
    let sc_mean = new Array(2.64806651, 2.77311511, 3.28834857, 3.14059482, 3.27695998, 2.40109989,
                            2.77174370, 3.41481790, 2.96373962, 3.55646939, 3.28596883, 3.16507195,
                            3.84646562, 2.66375580, 2.84308643, 2.84115364, 3.05039376, 2.68348531,
                            3.08851097, 2.77350384, 2.25531642, 3.83110291, 2.25995750, 3.92749700,
                            2.27085672, 3.74307538, 2.19580626, 3.68938926, 3.78911616, 3.59235091,
                            3.29799873, 2.93029506, 3.97528015, 2.61786597, 2.62583197, 2.83182117,
                            3.69818698, 2.46530638, 3.20069498, 3.59059570, 3.65463644, 2.07593349,
                            4.00006808, 1.99989147, 3.79290480, 1.89460495, 3.97637530, 3.18245330,
                            4.12299345, 3.95844145);

    let sc_std_dev = new Array(1.59872308, 1.75282354, 1.47623898, 1.53126126, 1.63224224, 1.50239025,
                               1.96093926, 1.61776744, 1.81182069, 1.70362966, 1.81063647, 1.50864954,
                               1.35337651, 1.57000386, 1.62279940, 1.75978260, 1.67187180, 1.80375882,
                               1.68257228, 1.75073647, 1.79552007, 1.30093790, 1.63155328, 1.27167863,
                               1.37172513, 1.49433656, 1.25511623, 1.20019861, 1.36128772, 1.16810797,
                               1.38483615, 1.93226963, 1.09145569, 1.56703885, 1.62459094, 2.00560343,
                               1.27253190, 1.30178197, 1.62876267, 1.10919813, 1.33900662, 1.23787778,
                               1.20377817, 1.18862067, 0.98482879, 1.21909085, 1.01708171, 1.57596355,
                               1.08412988, 1.07017010);

    sc = new StandardScaler(sc_mean, sc_std_dev);
    let scaled_answers = sc.transform(answers);
    //console.log("Scaled answer to question: " + scaled_answers);

    // Hardcode the PCA feature space matrix to apply PCA to answers
    let pca_feature_space_matrix = [[[ 0.32283459, -0.32986568,  0.31303830, -0.34166658,  0.33644789, -0.27928004,  0.33652715, -0.27608566,  0.29624799, -0.32218974]],
                                    [[-0.34678329,  0.26429488, -0.30719017,  0.19294648, -0.26972745, -0.35728850, -0.35434425, -0.36440024, -0.33869128, -0.32377197]],
                                    [[ 0.26082472, -0.32020228,  0.19879351, -0.39133385,  0.34069185, -0.31125747,  0.33918132, -0.32142607, -0.37022327, -0.26154122]],
                                    [[-0.35131788,  0.31842643, -0.23712070,  0.33580341, -0.35443122,  0.34883718, -0.30439441,  0.28669545, -0.34111952, -0.26013183]],
                                    [[-0.33919841,  0.31454745, -0.32542621,  0.28287456, -0.34907092,  0.28433745, -0.29425841, -0.32075810, -0.24128263, -0.38690404]]] 

    // Apply PCA (multiply scaled answer matrix with PCA feature space)
    let transformed_answers = new Array(5);
    for (let i=0; i<5; i++) {
        let scaled_answers_each_dim = new Array(scaled_answers.slice(i*10, (i+1)*10));
        let pca_feature_space_transposed = matrix_transpose(pca_feature_space_matrix[i]);
        transformed_answers[i] = matrix_multiply(scaled_answers_each_dim, pca_feature_space_transposed);
    }
    //console.log("Transformed answers: " + transformed_answers);

    // Hardcode mean and std_dev of each dimension
    let dimension_mean = new Array(-2.018989617751612e-17, 4.890441518553905e-17, -6.101835289204873e-17, -2.79293563788973e-17, 2.635903112064605e-18);
    let dimension_std_dev = new Array(2.225963132252126, 2.1364745736304047, 2.0043289131417277, 1.9134833505695392, 1.88472304096602);

    // Find CDF (which corresponds to percentile) of each dimension
    let percentile = new Array(5);
    for (let i=0; i<5; i++) {
        percentile[i] = ncdf(transformed_answers[i], dimension_mean[i], dimension_std_dev[i]) * 100;
    }
    //console.log("Percentile on each dimension (Normal CDF): " + percentile);

    // Display in result table
    document.getElementById("ext_res").innerHTML = "" + (100-percentile[0]).toFixed(1);
    document.getElementById("neu_res").innerHTML = "" + (100-percentile[1]).toFixed(1);
    document.getElementById("agr_res").innerHTML = "" + (100-percentile[2]).toFixed(1);
    document.getElementById("con_res").innerHTML = "" + (100-percentile[3]).toFixed(1);
    document.getElementById("opn_res").innerHTML = "" + (100-percentile[4]).toFixed(1);
}

class StandardScaler {
    
    constructor(mean, variance) {
        this.mean = mean;
        this.variance = variance;
    }
    
    transform(input_data) {
        let output_data = new Array(input_data.length);
        for (let i=0; i<input_data.length; i++) {
            output_data[i] = (input_data[i] - this.mean[i]) / Math.sqrt(this.variance[i]);
        }
        return output_data;
    }
}

function matrix_multiply(a, b) {
  var aNumRows = a.length, aNumCols = a[0].length,
      bNumRows = b.length, bNumCols = b[0].length,
      m = new Array(aNumRows);  // initialize array of rows
  for (var r = 0; r < aNumRows; ++r) {
    m[r] = new Array(bNumCols); // initialize the current row
    for (var c = 0; c < bNumCols; ++c) {
      m[r][c] = 0;             // initialize the current cell
      for (var i = 0; i < aNumCols; ++i) {
        m[r][c] += a[r][i] * b[i][c];
      }
    }
  }
  return m;
}

function matrix_transpose(matrix) {
  const rows = matrix.length, cols = matrix[0].length;
  const grid = [];
  for (let j = 0; j < cols; j++) {
    grid[j] = Array(rows);
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[j][i] = matrix[i][j];
    }
  }
  return grid;
}

function ncdf(x, mean, std) {
  var x = (x - mean) / std;
  var t = 1 / (1 + .2315419 * Math.abs(x));
  var d =.3989423 * Math.exp( -x * x / 2);
  var prob = d * t * (.3193815 + t * ( -.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  if( x > 0 ) prob = 1 - prob;
  return prob;
}
