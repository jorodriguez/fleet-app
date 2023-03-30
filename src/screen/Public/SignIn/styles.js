import { COLOR, FAMILY, SIZE } from '@theme/typography'

const React = require('react-native')
const { Platform } = React

export default {
    bgImg: {
        width: '100%',
        bottom: 0,
        zIndex: 4
    },
    bgCover: {
        flex: 1,
        position: 'absolute',
        zIndex: 2,
        width: '100%',
        height: '100%',
        backgroundColor: COLOR.violet
    },
    bgLayout: {
        flex: 1,
        position: 'absolute',
        zIndex: 3,
        width: '100%',
        height: '100%',

    },
    bgMainLayout: {
        flex: 1,
        zIndex: 3,
        width: '100%',
        marginTop: 70,
        backgroundColor: COLOR.light,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    actBarBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        padding: 10
    },

    /** -- Content --**/
    signInForm: {
        marginHorizontal: 20,
        marginTop: 30
    },
    signInTitle: {
        fontFamily: FAMILY.bold,
        fontSize: SIZE.huge,
        color: COLOR.dark,
        paddingVertical: 15,
        paddingBottom: 30
    },
    formText: {
        fontFamily: FAMILY.bold,
        fontSize: SIZE.small,
        color: 'rgba(65, 65, 65, 1)'
    },
    formRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: COLOR.smokeLight,
        marginBottom: 30
    },
    formInput: {
        flex: 1,
        fontFamily: FAMILY.bold,
        fontSize: SIZE.medium,
        color: COLOR.dark
    },
    forgotText: {
        fontFamily: FAMILY.bold,
        fontSize: SIZE.medium,
        color: COLOR.grey,
        alignSelf: 'flex-end',
    },
    loginBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR.red,
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginVertical: 30
    },
    loginBtnText: {
        fontFamily: FAMILY.bold,
        fontSize: SIZE.medium,
        color: COLOR.light
    },
    createAccountInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    customerText: {
        fontFamily: FAMILY.regular,
        fontSize: SIZE.medium,
        color: COLOR.grey,
        marginRight: 10
    },
    createBtnText: {
        fontFamily: FAMILY.bold,
        fontSize: SIZE.medium,
        color: COLOR.dark
    },

    /**/
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#6BADC7",
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'repeat',
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    containerTextoSiaSiscop: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        borderBottomWidth: 1,
        width: 300,
        height: 40,
        marginBottom: 20,
        marginTop: 5,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        opacity: 0.9,
        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonContainer: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
        width: 300,
        borderRadius: 20,
        backgroundColor: 'transparent'
    },
    loginButton: {
        backgroundColor:  COLOR.red,
        shadowColor: "#808080",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.50,
        shadowRadius: 12.35,
        elevation: 19,
    },
    loginText: {
        color: 'white',
        fontSize: 15
    },
}