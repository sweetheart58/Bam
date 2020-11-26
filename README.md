# Bam
## Bam is a decentralised health dashboard which simplifies the doctor-patient interaction in times of global pandemic

### With Bam you can:
    1. Book appointments with available doctor using secured blockchain storage. All of the patient data is decentralised and stored on the ethereum blockchain.
    2. Have 1-to-1 Real Time Communication based Video Call with your doctor at the aforementioned appointment time.
    3. Pay the doctor directly using eth (Currency used on the ethereum blockchain).
    4. Get a digitally signed and secured prescription by the doctor which can be directly provided to a pharamacist. 
    5. Converse with our NLP powered medical bot to have a preliminary diagnosis based on your provided symptoms.


### Tech-Stack used:
    1. ReactJs for client
    2. Truffle for the decentralised app
    3. Ethereum Blockchain
    4. IPFS
    5. Agora-SDK for 1-to-1 Real Time Communication
    6. Infermedica API for Natural Language Processing
    7. Web Speech API for Speech to Text Parsing

### File Structure
```
.
|-- contracts/  # Ethereum Smart Contracts for Blockchain deployments
|-- migrations/ # Directory to store the deployed ABI
|-- public/  # Static Files
|-- src/  # Files for the Bam Client
|-- test/ # Test Files for Smart Contracts
|-- .gitattributes
|-- .gitignore
|-- package-lock.json
|-- package.json
|-- truffle-config.json
```


![Untitled Diagram](https://user-images.githubusercontent.com/44068102/100355477-d8866700-3017-11eb-99d2-45db5db675f4.jpg)

### User Appointments Screen
![user-appointments](https://user-images.githubusercontent.com/55717315/100318583-487afa00-2fe4-11eb-94a4-563314f3e0d0.jpg)

### User Payments Screen
![user-payments](https://user-images.githubusercontent.com/55717315/100318735-87a94b00-2fe4-11eb-99ba-82669b5ea0f3.jpg)

### Medical Bot in Action:
![medical-bot](https://user-images.githubusercontent.com/55717315/100319600-eb804380-2fe5-11eb-9047-7fbe2b432bb0.gif)

### How to run locally:
```
Setup local blockchain with Ganache
Run truffle migrate --reset
Run npm start
```
### Running tests:
```
cd test
Run truffle test
```



