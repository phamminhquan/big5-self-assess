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

    // Put scaled array in matrix form (multidimensional array) for pca
    let scaled_answers_matrix = new Array(scaled_answers);
    //console.log("Shape of scaled answer matrix: ", scaled_answers_matrix.length, scaled_answers_matrix[0].length);

    // Hardcode the PCA feature space matrix to apply PCA to answers
    let pca_feature_space_matrix = [[-2.00267508e-01,  1.97736872e-01, -2.56533376e-01,  2.16343019e-01,
                                     -2.40734688e-01,  2.01496122e-01, -2.27450357e-01,  1.48727278e-01,
                                     -1.80289434e-01,  2.13204003e-01,  1.51031520e-01, -1.29461759e-01,
                                      1.17000486e-01, -1.05894414e-01,  1.28114910e-01,  1.54926240e-01,
                                      1.48414435e-01,  1.60554893e-01,  1.66485882e-01,  1.91649349e-01,
                                      9.28330514e-02, -1.82793321e-01,  8.52726347e-02, -1.11271455e-01,
                                      1.31951600e-01, -5.07649323e-02,  1.87833144e-01, -1.32198660e-01,
                                     -1.12005065e-01, -1.83998796e-01, -1.00913837e-01,  4.68080486e-02,
                                     -6.66962258e-02,  1.40636205e-01, -1.00772598e-01,  8.71023223e-02,
                                     -3.95182666e-02,  1.25151182e-01, -8.55661437e-02, -8.92812166e-02,
                                     -7.11755896e-02,  9.52274344e-02, -4.58262266e-02,  6.97163006e-02,
                                     -1.33601743e-01,  8.47799156e-02, -1.06773706e-01, -3.16552968e-02,
                                     -1.11808111e-02, -1.19665917e-01],
                                    [-9.88425910e-02,  9.55880685e-02, -5.42768355e-02,  2.30956131e-02,
                                     -1.21795316e-01,  7.34055069e-02, -1.04788011e-01,  2.89533066e-02,
                                     -9.27310001e-02,  2.63934270e-03, -2.47931472e-01,  1.36036625e-01,
                                     -2.51943161e-01,  1.10215926e-01, -1.88844711e-01, -2.56710551e-01,
                                     -2.66864704e-01, -2.65090671e-01, -2.12895929e-01, -2.15236125e-01,
                                      9.16807397e-02, -1.74677746e-01, -4.38902186e-02, -2.17905604e-01,
                                      1.36474942e-01, -2.05025060e-01,  1.21921241e-01, -1.65851709e-01,
                                     -2.31392228e-01, -1.17657343e-01,  4.94673705e-02, -1.41958031e-01,
                                     -5.09792893e-02, -1.84399551e-01,  5.72068916e-02, -1.48380213e-01,
                                     -1.65748747e-02, -1.06874516e-01,  2.53060899e-04, -3.34317367e-02,
                                     -6.96737271e-02, -1.61027958e-02, -1.61554347e-01,  3.06303239e-02,
                                     -8.26241854e-02,  5.71765674e-02, -3.47805373e-02, -8.97834616e-02,
                                     -1.48037365e-01, -1.31074016e-01],
                                    [ 1.75397073e-01, -2.02259587e-01,  8.61345330e-02, -2.14758819e-01,
                                      1.07130162e-01, -1.22288328e-01,  1.46875102e-01, -2.29510354e-01,
                                      1.67719182e-01, -1.98895303e-01, -5.26628887e-02,  1.37838093e-02,
                                     -1.10627201e-01, -7.05350459e-03,  9.86176782e-03,  1.96908262e-04,
                                      4.28000004e-02,  4.72157069e-02,  1.48241548e-02, -2.74070359e-02,
                                      7.75166388e-02, -1.94738361e-02,  1.46505229e-01, -1.44292047e-01,
                                      4.10958050e-02, -1.24274748e-01, -4.35911167e-03, -1.18876759e-01,
                                     -1.31825706e-01, -6.66388309e-02, -2.56174221e-01,  1.86915453e-01,
                                     -2.43153374e-01,  1.80999257e-01, -2.25728588e-01,  2.01853626e-01,
                                     -2.62816169e-01,  1.70863085e-01, -2.47210515e-01, -2.34013740e-01,
                                     -9.65452568e-02,  5.40617038e-02, -6.80883076e-02,  3.88037792e-02,
                                     -9.23869354e-02,  2.84321778e-02, -1.41436103e-01, -5.84824505e-02,
                                     -1.70980176e-01, -7.47556847e-02],
                                    [ 1.78762325e-02, -4.64694122e-02,  7.45950360e-02, -4.52302551e-02,
                                      3.10379921e-02,  5.67776448e-02,  3.69771014e-02,  6.68696215e-03,
                                     -7.16680895e-02, -4.27228919e-02,  8.92209187e-02, -6.92914798e-02,
                                      6.77753372e-02,  4.80037802e-03,  5.97023620e-02,  6.72905290e-02,
                                      7.95925574e-03,  8.30826235e-03, -2.61444523e-03, -5.01580863e-02,
                                     -1.02005218e-01,  8.29249819e-02, -1.58860492e-01,  1.64781739e-01,
                                     -1.74513653e-01,  1.69458519e-01, -1.55563219e-01,  1.22907760e-01,
                                      1.39508625e-01,  5.03493054e-02,  1.81422260e-02, -1.20519849e-01,
                                     -7.31501076e-02, -7.06481552e-02,  1.09758489e-01, -1.00580599e-01,
                                      3.92419671e-02, -7.30033371e-02,  1.11763299e-01, -7.78670416e-02,
                                     -3.03236218e-01,  2.75446495e-01, -2.56090295e-01,  2.29032816e-01,
                                     -2.77431304e-01,  2.15147010e-01, -2.41398903e-01, -3.15269918e-01,
                                     -1.59477387e-01, -3.06717325e-01],
                                    [ 1.68469242e-01, -1.04644322e-01,  7.83194917e-02, -1.27602932e-01,
                                      1.32907301e-01, -3.20083353e-02,  1.41274668e-01, -1.17860574e-01,
                                      1.70379567e-01, -9.89451560e-02,  9.81859009e-02, -7.60591085e-02,
                                      6.18638570e-02,  4.45937779e-02,  1.23007031e-01,  1.48167550e-01,
                                      1.42953233e-01,  1.41381758e-01,  2.24992958e-01,  1.67553817e-02,
                                      2.30593659e-01, -1.11258136e-01,  2.05240419e-01, -2.13939530e-01,
                                      2.45521736e-01, -1.48736918e-01,  2.05203848e-01, -1.16075990e-01,
                                     -1.58282801e-01, -2.46727541e-02,  2.10352747e-01, -1.61901931e-01,
                                      1.18394655e-01, -8.70780704e-02,  2.28777533e-01, -1.45504292e-01,
                                      2.17410875e-01, -4.52792832e-02,  2.27340340e-01,  1.59692553e-01,
                                     -8.68766308e-03,  1.43099553e-01, -6.04445140e-02,  1.92274522e-01,
                                      7.66242469e-02,  1.18218953e-01,  4.20427969e-02,  2.14246024e-02,
                                     -6.91574589e-02,  6.38394225e-03]];

    // Transposing the PCA feature space
    pca_feature_space_transposed = matrix_transpose(pca_feature_space_matrix);
    //console.log("Shape of pca feature space transpose: ", pca_feature_space_transposed.length, pca_feature_space_transposed[0].length);

    // Apply PCA (multiply scaled answer matrix with PCA feature space)
    transformed_answers = matrix_multiply(scaled_answers_matrix, pca_feature_space_transposed);
    //console.log("Transformed answers: " + transformed_answers);

    // Hardcode mean and std_dev of each dimension
    let dimension_mean = new Array(2.451950724669458e-16, 1.581541867238763e-16, -1.2170020751447217e-16, -4.060412453478242e-17, -8.928420754057129e-17);
    let dimension_std_dev = new Array(2.6825002725594334, 2.236072243304179, 1.9924920315082058, 1.8689040835640973, 1.667714868207216);

    // Find CDF (which corresponds to percentile) of each dimension
    let percentile = new Array(5);
    for (let i=0; i<5; i++) {
        percentile[i] = ncdf(transformed_answers[0][i], dimension_mean[i], dimension_std_dev[i]) * 100;
    }
    //console.log("Percentile on each dimension (Normal CDF): " + percentile);

    // Display in result table
    document.getElementById("ext_res").innerHTML = "" + (percentile[0].toFixed(1));
    document.getElementById("neu_res").innerHTML = "" + (percentile[1].toFixed(1));
    document.getElementById("con_res").innerHTML = "" + (percentile[2].toFixed(1));
    document.getElementById("opn_res").innerHTML = "" + (percentile[3].toFixed(1));
    document.getElementById("agr_res").innerHTML = "" + (percentile[4].toFixed(1));
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
