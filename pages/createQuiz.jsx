import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import Navbar from '../components/Navbar';
import { useAppContext } from '../context/AppProvider';

const CreateQuiz = () => {
  const { contract, address } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [questionObject, setQuestionObject] = useState(null);

  const title = useRef();
  const description = useRef();
  const question = useRef();
  const answer = useRef();
  const questionId = useRef();
  const optionText = useRef();
  const isCorrect = useRef();
  const correctOption = useRef();
  const quizId = useRef();

  const createQuiz = () => {
    const _title = title.current.value;
    const _description = description.current.value;
    if (address) {
      const myCall = contract.populate('create_participant', [_title, _description]);
      setLoading(true);
      contract['create_participant'](myCall.calldata)
        .then((res) => {
          console.info('Successful Response:', res);
        })
        .catch((err) => {
          console.error('Error: ', err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      handleWalletConnection();
    }
  };

  const handleCreateQuestion = () => {
    const _question = question.current.value;
    const _answer = answer.current.value;
    if (address) {
      const myCall = contract.populate("create_question", [
        id,
        _question,
        _answer,
      ]);
      setLoading(true);
      contract["create_question"](myCall.calldata)
        .then((res) => {
          console.info("Successful Response:", res);
          question.current.value = "";
          answer.current.value = "";
        })
        .catch((err) => {
          console.error("Error: ", err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      handleWalletConnection();
    }
  };

  const getQuestion = () => { 
    if (contract) {
        const _questionId = questionId.current.value;
  
        const myCall = contract.populate("get_question", [id, _questionId]);
        setLoading(true);
        contract["get_question"](myCall.calldata, {
          parseResponse: false,
          parseRequest: false,
        })
          .then((res) => {
            let val = contract.callData.parse("get_question", res?.result ?? res);
            console.log(val);
            setQuestionObject(val);
          })
          .catch((err) => {
            console.error("Error: ", err);
          })
          .finally(() => {
            setLoading(false);
          });
      }
  };

  const handleOptionSubmission = () => {
    const _question_id = questionId.current.value;
    const _answer = answer.current.value;
    const _optionText = optionText.current.value;
    const _isCorrect = isCorrect.current.value;
    const _correctOptoin = correctOption.current.value;

    // console.log(_question_id, _optionText, _isCorrect, _correctOptoin);
    console.log(_question_id);

    if (address) {
      const myCall = contract.populate("create_option", [
        id,
        _question_id,
        _optionText,
        JSON.parse(_isCorrect),
        _correctOptoin,
      ]);
      setLoading(true);
      contract["create_option"](myCall.calldata)
        .then((res) => {
          console.info("Successful Response:", res);
          question.current.value = "";
          answer.current.value = "";
        })
        .catch((err) => {
          console.error("Error: ", err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      handleWalletConnection();
    }
  };

  const getQuiz = () => {
    if (contract) {
        const _quizId = quizId.current.value;
        console.log(_quizId);
  
        const myCall = contract.populate("get_quiz", [_quizId]);
        setLoading(true);
        contract["get_quiz"](myCall.calldata, {
          parseResponse: false,
          parseRequest: false,
        })
          .then((res) => {
            let val = contract.callData.parse("get_quiz", res?.result ?? res);
            console.log(val);
            setQuiz(val);
          })
          .catch((err) => {
            console.error("Error: ", err);
          })
          .finally(() => {
            setLoading(false);
          });
      }
  };

  return (
    <DefaultLayout>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg max-h-screen overflow-y-auto">
        <h3 className="text-2xl font-bold mb-4 text-center">Create French to English Quiz</h3>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Translate the word "Hello" to english</label>
          <input 
            className="w-full p-2 border border-gray-300 rounded-md" 
            type="text" 
            ref={title} 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Translate the word "Hello" to french</label>
          <input 
            className="w-full p-2 border border-gray-300 rounded-md" 
            type="text" 
            ref={description} 
          />
        </div>
        <button 
          className={`w-full p-2 bg-blue-500 text-white rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
          onClick={createQuiz} 
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create'}
        </button>

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">EnglishFrench Quiz #</h3>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Question</label>
            <input 
              className="w-full p-2 border border-gray-300 rounded-md" 
              ref={question} 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Answer</label>
            <input 
              className="w-full p-2 border border-gray-300 rounded-md" 
              ref={answer} 
            />
          </div>
          <button
            className="w-full p-2 bg-blue-500 text-white rounded-md mb-4"
            onClick={handleCreateQuestion}
          >
            Create
          </button>

          <h3 className="text-xl font-bold mb-4">Create Language Choices</h3>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Language Number</label>
            <input 
              className="w-full p-2 border border-gray-300 rounded-md" 
              ref={questionId} 
            />
          </div>
          <button 
            className="w-full p-2 bg-gray-500 text-white rounded-md mb-4" 
            onClick={getQuestion}
          >
            Get Question
          </button>

          {questionObject && (
            <div className="p-4 bg-gray-100 rounded-md">
              <p>{bigintToShortStr(questionObject.text)}</p>
              {questionObject.options &&
                questionObject.options.map((option) => {
                  return (
                    <div className="mb-2" key={option.id}>
                      <label>{bigintToShortStr(option.text)}</label>&nbsp;
                      <input
                        type="radio"
                        className="ml-2"
                        value={bigintToShortStr(option.id.toString())}
                      />
                    </div>
                  );
                })}
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Language Option Text</label>
                <input 
                  className="w-full p-2 border border-gray-300 rounded-md" 
                  ref={optionText} 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Is Option Correct</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md" 
                  ref={isCorrect}
                >
                  <option value="false">False</option>
                  <option value="true">True</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Correct Option</label>
                <input 
                  className="w-full p-2 border border-gray-300 rounded-md" 
                  ref={correctOption} 
                />
              </div>
              <button
                onClick={handleOptionSubmission}
                className="w-full p-2 bg-gray-500 text-white rounded-md"
              >
                Submit Option
              </button>
            </div>
          )}
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Retrieve Languages' Quiz Id</h3>
          <div className="mb-4">
            <input 
              className="w-full p-2 border border-gray-300 rounded-md" 
              ref={quizId} 
            />
          </div>
          <button 
            className="w-full p-2 bg-gray-500 text-white rounded-md mb-4" 
            onClick={getQuiz}
          >
            Retrieve Language Quiz responses
          </button>
          {quiz && (
            <div className="p-4 bg-gray-100 rounded-md">
              <span className="block text-xl font-bold mb-2">{quiz.id.toString()}</span>
              <hr />
              <span>{bigintToShortStr(quiz.title)}</span>
              <p>{bigintToShortStr(quiz.description)}</p>
              <Link
                to={`/create-quiz/${quiz.id.toString()}`}
                className="w-full p-2 bg-blue-500 text-white rounded-md block text-center mt-4"
              >
                Visit
              </Link>
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CreateQuiz;
