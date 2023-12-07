const Java ={
    1 : `import java.util.Arrays;

    class Solution {
        public void setZeroes(int[][] matrix) {
            int rows = matrix.length;
            int cols = matrix[0].length;
    
            // Arrays to track rows and columns that need to be set to zero
            boolean[] zeroRows = new boolean[rows];
            boolean[] zeroCols = new boolean[cols];
    
            // Iterate through the matrix to find zeros and mark the corresponding rows and columns
            for (int i = 0; i < rows; i++) {
                for (int j = 0; j < cols; j++) {
                    if (matrix[i][j] == 0) {
                        zeroRows[i] = true;
                        zeroCols[j] = true;
                    }
                }
            }
    
            // Set entire rows to zero
            for (int i = 0; i < rows; i++) {
                if (zeroRows[i]) {
                    Arrays.fill(matrix[i], 0);
                }
            }
    
            // Set entire columns to zero
            for (int j = 0; j < cols; j++) {
                if (zeroCols[j]) {
                    for (int i = 0; i < rows; i++) {
                        matrix[i][j] = 0;
                    }
                }
            }
        }
    }
    `,
    2 : `import java.util.Arrays;

    class Solution {
        public void setZeroes(int[][] matrix) {
            for (int i = 0; i < matrix.length; i++) {
                for (int j = 0; j < matrix[0].length; j++) {
                    if (matrix[i][j] == 0) {
                        // Set entire row to zero
                        Arrays.fill(matrix[i], 0);
    
                        // Set entire column to zero
                        for (int k = 0; k < matrix.length; k++) {
                            matrix[k][j] = 0;
                        }
                    }
                }
            }
        }
    }
    `
}
export default Java