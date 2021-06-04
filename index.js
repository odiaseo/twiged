class ArraySlicer {
    static determineChunkSize(arrayLength, size) {
        const remainder = arrayLength % size;
        if (remainder === 0) {
            return arrayLength / size
        }

        return Math.ceil(arrayLength / size - 1)
    }

    static chunkArray(array, chunkSize) {
        const list = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            list.push(array.slice(i, i + chunkSize));
        }
        return list;
    }

    static validate(array, size) {
        if (!array || !Array.isArray(array)) {
            throw "Invalid array provided"
        }

        if (!size || size <= 0) {
            throw "Invalid array size, size must be a positive number"
        }

        if (array.length === 0) {
            throw "Array is empty"
        }

        if (array.length < size) {
            throw "Items in the array is less than the size required"
        }
    }

    static handleExcessItem(result, size) {
        if (result.length > size) {
            result[size - 1] = result[size - 1].concat(...result.slice(size, result.length))
        }

        return result.slice(0, size)
    }

    static generate(array, size) {
        ArraySlicer.validate(array, size);

        const chuckSize = ArraySlicer.determineChunkSize(array.length, size);
        const result = ArraySlicer.chunkArray(array, chuckSize);

        return ArraySlicer.handleExcessItem(result, size)
    }
}

const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'show', 34, 67, 89, 23, 675, 54, 'x34', 12, 34, 999, 45, 'abc', 'data'];
const size = 4;

const result = ArraySlicer.generate(testArray, size);

console.log({result});