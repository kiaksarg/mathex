/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-children-prop */
'use client'

import {
  Box,
  Button,
  Center,
  Checkbox,
  CheckboxGroup,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Radio,
  RadioGroup,
  Stack,
  Tag,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import evaluate from 'evaluator.js'
import { random } from 'lodash'
import React, { FC, useEffect, useRef, useState } from 'react'
import { FaDivide, FaMinus, FaPlus, FaTimes, FaTrash } from 'react-icons/fa'

import Card from './Card'

const MathEx: FC = () => {
  const toast = useToast()
  const inputResultRef = useRef<HTMLInputElement>(null)
  const getRandomNum = (min = 2, max = 9) => random(min, max, false)
  const GetRange = (str: string) => {
    const rng = str.split('-')
    return rng?.length > 1 ? rng : [...rng, ...rng]
  }
  const [textAreaContent, setTextAreaContent] = useState('')
  const [expression, setExpression] = useState('')
  const [customProblems, setCustomProblems] = useState<string[]>([])
  const customProblemsStore = useRef<string[]>([])
  const [currentProblem, setCurrentProblem] = useState<string>('')
  const [useCustomProblems, setUseCustomProblems] = useState(false)
  const [isTextAreaChanged, setIsTextAreaChanged] = useState(false)

  const [problemSets, setProblemSets] = useState<string[][]>([
    [
      // Set 1
      '9 - 7 = 2',
      '6 + 7 = 13',
      '5 + 7 = 12',
      '9 - 6 = 3',
      '2 + 7 = 9',
      '9 - 3 = 6',
      '6 + 8 = 14',
      '7 + 8 = 15',
      '9 - 2 = 7',
    ],
    [
      // Set 2
      '2/3 = 0.667',
      '1/2 = 0.5',
      '1/4 = 0.25',
      '1/5 = 0.2',
      '1/3 = 0.333',
      '3/4 = 0.75',
      '3/5 = 0.6',
    ],
    ['3/5 = 0.6', '1/3 = 0.333', '2/3 = 0.667', '3/4 = 0.75'],
    [
      // Set 3
      '0.167 = 1/6',
      '9/10 = 0.9',
      '1/2 = 0.5',
      '5/6 = 0.833',
      '1/10 = 0.1',
      '1/8 = 0.125',
      '7/8 = 0.875',
      '0.1 = 1/10',
      '0.6 = 3/5',
      '0.25 = 1/4',
      '0.5 = 1/2',
      '5/4 = 1.25',
      '3/5 = 0.6',
      '0.875 = 7/8',
      '1/5 = 0.2',
      '0.75 = 3/4',
      '0.667 = 2/3',
      '0.9 = 9/10',
      '1/12 = 0.083',
      '1/6 = 0.167',
      '1/3 = 0.333',
      '3/4 = 0.75',
      '0.833 = 5/6',
      '1/4 = 0.25',
      '1.25 = 5/4',
      '2/3 = 0.667',
      '0.2 = 1/5',
      '0.083 = 1/12',
      '0.125 = 1/8',
      '0.333 = 1/3',
    ],
  ])

  const [selectedSetIndex, setSelectedSetIndex] = useState<number | null>(null)

  const [defaultOp, setDefaultOp] = useState('*')
  const [operationsList, setOperationsList] = useState<string[]>([])

  const firstNumberRangeRef = useRef('2-9')
  const secondNumberRangeRef = useRef('2-9')
  const thirdNumberRangeRef = useRef('2-9')
  const forthNumberRangeRef = useRef('2-9')

  const firstNumRange = GetRange(firstNumberRangeRef.current)
  const firstNumberRef = useRef(getRandomNum(Number(firstNumRange[0]), Number(firstNumRange[1])))

  const secondNumRange = GetRange(secondNumberRangeRef.current)
  const secondNumberRef = useRef(getRandomNum(Number(secondNumRange[0]), Number(secondNumRange[1])))

  const thirdNumRange = GetRange(thirdNumberRangeRef.current)
  const thirdNumberRef = useRef(getRandomNum(Number(thirdNumRange[0]), Number(thirdNumRange[1])))

  const forthNumRange = GetRange(forthNumberRangeRef.current)
  const forthNumberRef = useRef(getRandomNum(Number(forthNumRange[0]), Number(forthNumRange[1])))

  const shuffleArray = (array: string[]) => {
    const clonedArray = [...array]
    for (let i = clonedArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[clonedArray[i], clonedArray[j]] = [clonedArray[j], clonedArray[i]]
    }
    return clonedArray
  }

  useEffect(() => {
    const storedProblemSets = localStorage.getItem('problemSets')
    if (storedProblemSets) {
      setProblemSets(JSON.parse(storedProblemSets))
    }
  }, [])

  const makeExpression = (ops = operationsList, op = defaultOp) => {
    let finalExp = `${firstNumberRef.current}${op}${secondNumberRef.current}`
    if (ops.length > 0) {
      ops.forEach((opItem, id) => {
        finalExp += `${opItem}${id % 2 === 0 ? thirdNumberRef.current : forthNumberRef.current}`
      })
    }
    setExpression(finalExp)
  }

  useEffect(() => {
    if (useCustomProblems && customProblems.length > 0) {
      setCurrentProblem(customProblems[0])
    } else {
      makeExpression()
    }
  }, [useCustomProblems])

  const genRandom = () => {
    const firstNumRange = GetRange(firstNumberRangeRef.current)
    const secondNumRange = GetRange(secondNumberRangeRef.current)
    const thirdNumRange = GetRange(thirdNumberRangeRef.current)
    const forthNumRange = GetRange(forthNumberRangeRef.current)

    firstNumberRef.current = getRandomNum(Number(firstNumRange[0]), Number(firstNumRange[1]))

    if (defaultOp === '-') {
      secondNumberRef.current = getRandomNum(
        Number(secondNumRange[0]),
        Number(firstNumberRef.current) >= Number(secondNumRange[1])
          ? Number(secondNumRange[1])
          : Number(firstNumberRef.current)
      )
    } else {
      secondNumberRef.current = getRandomNum(Number(secondNumRange[0]), Number(secondNumRange[1]))
    }
    thirdNumberRef.current = getRandomNum(Number(thirdNumRange[0]), Number(thirdNumRange[1]))
    forthNumberRef.current = getRandomNum(Number(forthNumRange[0]), Number(forthNumRange[1]))
    makeExpression()
  }

  const addToOperationsList = (op: string, isChecked: boolean) => {
    const ops = [...operationsList]
    if (isChecked) {
      if (ops.indexOf(op) === -1) ops.push(op)
    } else ops.splice(ops.indexOf(op), 1)

    setOperationsList([...ops])
    makeExpression(ops)
  }

  const checkResult = () => {
    const res = useCustomProblems ? eval(currentProblem.split('=')[0].trim()) : evaluate(expression)

    const inputValue = inputResultRef.current ? parseInputValue(inputResultRef.current.value.trim()) : 0
    const expectedValue = parseFloat(res?.toFixed(3) ?? 0)

    // Use a tolerance level for comparison
    const tolerance = 0.001
    if (Math.abs(expectedValue - inputValue) <= tolerance) {
      toast({
        title: 'Correct ✌️',
        status: 'success',
        duration: 1000,
        isClosable: true,
      })
      if (inputResultRef.current) inputResultRef.current.value = ''
      if (useCustomProblems) {
        setCustomProblems((prev) => {
          let newProblems = prev.slice(1)
          if (newProblems.length === 0) {
            newProblems = shuffleArray([...prev])
          }
          setCurrentProblem(newProblems[0] || '')
          console.log('newProblems', newProblems)
          if (newProblems.length <= 1) return [...customProblemsStore.current]
          else return newProblems
        })
      } else {
        genRandom()
      }
    } else {
      if (inputResultRef.current) inputResultRef.current.value = ''
      toast({
        title: 'Incorrect...! ',
        status: 'error',
        duration: 1000,
        isClosable: true,
      })
    }
  }

  const parseInputValue = (value: string) => {
    if (value.includes('/')) {
      const [numerator, denominator] = value.split('/').map(Number)
      return numerator / denominator
    }
    return parseFloat(value)
  }

  const loadProblemSet = (index: number) => {
    setSelectedSetIndex(index)
    const selectedSet = problemSets[index]
    setTextAreaContent(selectedSet.join('\n'))
    setCustomProblems(shuffleArray(selectedSet))
    setCurrentProblem(selectedSet[0] || '')
    customProblemsStore.current = [...shuffleArray(selectedSet)]
  }

  const removeProblemSet = (index: number) => {
    const updatedProblemSets = problemSets.filter((_, i) => i !== index)
    setProblemSets(updatedProblemSets)
    localStorage.setItem('problemSets', JSON.stringify(updatedProblemSets))
  }

  const addProblemSet = () => {
    const newSet = textAreaContent.split('\n')
    const updatedProblemSets = [...problemSets, newSet]
    setProblemSets(updatedProblemSets)
    localStorage.setItem('problemSets', JSON.stringify(updatedProblemSets))
    setIsTextAreaChanged(false)
  }

  return (
    <Stack>
      <Card>
        <Stack spacing="3">
          <Checkbox onChange={(e) => setUseCustomProblems(e.target.checked)}>Use Custom Problems</Checkbox>
          {useCustomProblems && (
            <Box>
              <Text>{"Enter custom problems (one per line, e.g., '7 + 8 = 15'):"}</Text>
              <Textarea
                placeholder="Enter custom problems"
                value={textAreaContent}
                onChange={(e) => {
                  setTextAreaContent(e.target.value)
                  setIsTextAreaChanged(true)
                }}
                onBlur={(e) => {
                  const problems = e.target.value.split('\n')
                  localStorage.setItem('customProblems', problems.join('\n'))
                  setCustomProblems(shuffleArray(problems))
                  setCurrentProblem(problems[0] || '')
                  customProblemsStore.current = [...shuffleArray(problems)]

                  if (isTextAreaChanged) {
                    addProblemSet()
                  }
                }}
                rows={6} // Adjust the number of rows as needed
              />
            </Box>
          )}
          {!useCustomProblems && (
            <>
              <InputGroup size="sm">
                <InputLeftAddon children="First" />
                <Input
                  defaultValue={firstNumberRangeRef.current}
                  onChange={(e) => (firstNumberRangeRef.current = e.target.value)}
                  placeholder="First Range"
                  minW="80px"
                />
              </InputGroup>
              <InputGroup size="sm">
                <InputLeftAddon children="2nd" />
                <Input
                  defaultValue={secondNumberRangeRef.current}
                  onChange={(e) => (secondNumberRangeRef.current = e.target.value)}
                  placeholder="Second Num Range"
                  minW="80px"
                />
              </InputGroup>
              <InputGroup size="sm">
                <InputLeftAddon children="Third" />
                <Input
                  defaultValue={thirdNumberRangeRef.current}
                  onChange={(e) => (thirdNumberRangeRef.current = e.target.value)}
                  placeholder="Third Num Range"
                  minW="80px"
                />
              </InputGroup>
              <InputGroup size="sm">
                <InputLeftAddon children="Forth" />
                <Input
                  defaultValue={forthNumberRangeRef.current}
                  onChange={(e) => (forthNumberRangeRef.current = e.target.value)}
                  placeholder="Forth Num Range"
                  minW="80px"
                />
              </InputGroup>
              <RadioGroup
                onChange={(selected) => {
                  setDefaultOp(selected)
                  makeExpression(operationsList, selected)
                }}
                defaultValue="*"
              >
                <Stack spacing={3} direction="row">
                  <Radio value="*">
                    <FaTimes />
                  </Radio>
                  <Radio value="+">
                    <FaPlus />
                  </Radio>
                  <Radio value="-">
                    <FaMinus />
                  </Radio>
                  <Radio value="/">
                    <FaDivide />
                  </Radio>
                </Stack>
              </RadioGroup>
              <Button onClick={genRandom} colorScheme="blue">
                Generate
              </Button>
              <CheckboxGroup defaultValue={[]}>
                <Stack spacing={[1, 5]} direction={['column', 'row']}>
                  <Checkbox value="+" onChange={(e) => addToOperationsList('+', e.target.checked)}>
                    <FaPlus />
                  </Checkbox>
                  <Checkbox value="-" onChange={(e) => addToOperationsList('-', e.target.checked)}>
                    <FaMinus />
                  </Checkbox>
                  <Checkbox value="*" onChange={(e) => addToOperationsList('*', e.target.checked)}>
                    <FaTimes />
                  </Checkbox>
                  <Checkbox value="/" onChange={(e) => addToOperationsList('/', e.target.checked)}>
                    <FaDivide />
                  </Checkbox>
                </Stack>
              </CheckboxGroup>
            </>
          )}
          <Center>
            <Tag size="lg" colorScheme="purple">
              <Text fontSize="4xl">
                {useCustomProblems ? (currentProblem ? currentProblem.split('=')[0].trim() : '') : expression}
              </Text>
            </Tag>
          </Center>
          <Text>Enter the result:</Text>
          <Input
            ref={inputResultRef}
            autoFocus={true}
            onKeyPress={(e) => {
              if (e.key === 'Enter') checkResult()
            }}
            colorScheme="green"
            size="lg"
          />
          <Button onClick={checkResult} colorScheme="green">
            Check
          </Button>
        </Stack>
      </Card>
      {useCustomProblems && (
        <Card>
          <Box mt={4}>
            <Text>Select a problem set to load:</Text>
            {problemSets.map((set, index) => (
              <Box
                key={index}
                p={3}
                m={2}
                bg="gray.100"
                borderRadius="md"
                cursor="pointer"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <HStack>
                  <Text onClick={() => loadProblemSet(index)}>{set.slice(0, 3).join(', ')} ,...</Text>
                  <Tag colorScheme="blue">{set.length}</Tag>
                  <IconButton
                    aria-label="Remove problem set"
                    icon={<FaTrash />}
                    onClick={() => removeProblemSet(index)}
                    colorScheme="red"
                    size="sm"
                  />
                </HStack>
              </Box>
            ))}
          </Box>
        </Card>
      )}
    </Stack>
  )
}

export default MathEx
