const python ={
    1 : `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        n = len(nums)
        M = {}
        for i in range(n):
            x = target - nums[i]
            if nums[i] in M:
                return [M[nums[i]],i]
            else:
                M[x] = i`,
    2 : `class Solution(object):
    def isPalindrome(self, x):
        if x < 0:
            return False
        reversed_number = 0
        number = x
        while x > 0:
            digit = x % 10
            x = x // 10
            reversed_number = reversed_number * 10 + digit

        return number == reversed_number`
}
export default python

