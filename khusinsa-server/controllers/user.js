const UserModel = require('../models/user');
const util = require('../modules/util');
const CODE = require('../modules/statusCode');
const MSG = require('../modules/responseMessage');
const encrypt = require('../modules/crypto');
const jwt = require('../modules/jwt');
const statusCode = require('../modules/statusCode');
const responseMessage = require('../modules/responseMessage');

module.exports = {
    signup: async (req, res) => {
        const {
            id,
            name,
            password,
        } = req.body;
        if (!id || !name || !password) {
            res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.NULL_VALUE));
            return;
        }
        // 사용자 중인 아이디가 있는지 확인
        if (await UserModel.checkUser(id)) {
            res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.ALREADY_ID));
            return;
        }
        const {
            salt,
            hashed
        } = await encrypt.encrypt(password);
        const idx = await UserModel.signup(id, name, hashed, salt);
        if (idx === -1) {
            return res.status(CODE.DB_ERROR)
                .send(util.fail(CODE.DB_ERROR, MSG.DB_ERROR));
        }
        res.status(CODE.OK)
            .send(util.success(CODE.OK, MSG.CREATED_USER, {
                userId: idx
            }));
    },
    signin: async (req, res) => {
        const {
            id,
            password
        } = req.body;
        if (!id || !password) {
            res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.NULL_VALUE));
            return;
        }

        // User의 아이디가 있는지 확인 - 없다면 NO_USER 반납
        const user = await UserModel.getUserById(id);
        if (user[0] === undefined) {
            return res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.NO_USER));
        }
        // req의 Password 확인 - 틀렸다면 MISS_MATCH_PW 반납
        const hashed = await encrypt.encryptWithSalt(password, user[0].salt);
        if (hashed !== user[0].password) {
            return res.status(CODE.BAD_REQUEST)
                .send(util.fail(CODE.BAD_REQUEST, MSG.MISS_MATCH_PW));
        }

        const {
            token,
            refreshToken
        } = await jwt.sign(user[0]);

        // 로그인이 성공적으로 마쳤다면 - LOGIN_SUCCESS 전달
        res.status(CODE.OK)
            .send(util.success(CODE.OK, MSG.LOGIN_SUCCESS, {
                accessToken: token
                //, refreshToken: refreshToken
            }));
    },
    getClothAll: async(req,res) =>{
        // const userIdx = req.params.id; // url의 id를 가져옴
        // const { userIdx } = req.body;
        // const cloth = await UserModel.getClothAll(userIdx); // url에 적힌 유저가 가진 옷들 조회
        const cloth = await UserModel.getClothAll();
        if(!cloth){
            return res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST,responseMessage.READ_CLOTH_FAIL));
        }else{
            return res.status(statusCode.OK)
                .send(util.success(statusCode.OK,responseMessage.READ_CLOTH_SUCCESS,cloth));
        }
    },
    getClothById: async(req, res) => {
        const clothIdx = req.params.id;
        const cloth = await UserModel.getClothById(clothIdx);
        if(!cloth){
            return res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST,responseMessage.READ_CLOTH_FAIL));
        }else{
            return res.status(statusCode.OK)
                .send(util.success(statusCode.OK,responseMessage.READ_CLOTH_SUCCESS,cloth[0]));
        }
    },
    updateCloth: async(req, res) => { 
        const clothIdx = req.params.id;
        const { name,brand,category,price,image } = req.body;
        const cloth = await UserModel.updateCloth(clothIdx,name,brand,category,price,image); // body로 넣어 보낸 price로 수정
        if(!cloth){
            return res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, responseMessage.UPDATE_CLOTH_FAIL));
        }
        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK,responseMessage.UPDATE_CLOTH_SUCCESS,cloth));
    },
    deleteCloth: async(req,res) => {
        // const userIdx = req.params.id;
        const { userIdx, clothIdx } = req.body;
        const cloth = await UserModel.deleteCloth(userIdx, clothIdx);
        if(!clothIdx){
            return res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST,responseMessage.NULL_VALUE));
        }
        if(!cloth){
            return res.status(statusCode.BAD_REQUEST)
                .send(util.fail(statusCode.BAD_REQUEST, responseMessage.DELETE_CLOTH_FAIL));
        }
        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK,responseMessage.DELETE_CLOTH_SUCCESS));
    },
    updateProfile: async (req, res) => {
        // 데이터 받아오기
        // data check - undefined
        // image type check
        // call model - database
    }
}