export class Model {
    constructor(
        public Id: string,
        public Agent: string,
        public Data: string,
        public Input: any, 
        public Output: any,
        public Description : string,
        public Status : number,
        public TrainingTime : string,
        public Accuracy : number,
        public CreatedAt: Date,
        // Dont change the format below (number and not Date), needed to use "some time ago " format
        public UpdatedAt: Date,
    ){}
}