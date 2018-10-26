#include "murmurapp.hpp"

using namespace eosio;
using std::string;

class murmurapp : public contract
{
  using contract::contract;

public:
  // contract constructor
  explicit murmurapp(account_name self) : contract(self) {}

  //@abi action
  void murmur(const string author, const string &content, const uint32_t &visiblity){
    print("murmur " ,";;", author," ;;", content," ;;", visiblity);
  }

  //@abi action
  void yell(const string from,const string murmur_id,const uint32_t &visiblity){
    print("yell",";;",from,";;",murmur_id,";;",visiblity);
  }

  //@abi action
  void snoop(const string from,const string murmur_id,const uint32_t &likestype){
    print("snoop",";;",from,";;",murmur_id,";;",likestype);
  }

  //@abi action
  void follow(const string from,const account_name to){
  print("follow",";;",from,";;",to);  
  }

  //@abi action
  void whisper(const string from,const account_name to,const string &content){
    print("whisper",";;",from,";;",to,";;",content);
  }

  //@abi action
  void comment(const string from,const string murmur_id,const string &comment){
    print("comment",";;",from,";;",murmur_id,";;",comment);
  }
};
  
EOSIO_ABI(murmurapp, (murmur)(yell)(snoop)(follow)(whisper)(comment));
