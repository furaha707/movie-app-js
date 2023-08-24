export default function handler(request, response){
  response.status(200).json({
    name: 'Furaha',
    age: 85,
    inValid: true
  })
}

// 서버리스 함수