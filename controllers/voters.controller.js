const Voter = require('../models/Voter.model.js');
const Photo = require('../models/Photo.model.js');

/****** VOTE FOR PHOTO ********/

exports.vote = async (req, res) => {
  
    try {
      const voter = await Voter.findOne({user: req.clientIp }) // we search for a voter based on ip address
      const photoToUpdate = await Photo.findOne({ _id: req.params.id });
      const clientIp = requestIp.getClientIp(req);
  
      if(!voter) {
        const newVoter = new Voter({
          user: clientIp,
          votes: photoToUpdate._id
        });
        await newVoter.save();
        photoToUpdate.votes++;
        await photoToUpdate.save();
        res.send({ message: 'OK'})
      } else {
        if (voter.votes.includes(photoToUpdate._id)) {
          res.status(500).send('You have already voted for this photo')
        } else {
          voter.votes.push(photoToUpdate._id);
          await voter.save();
          photoToUpdate.votes++;
          photoToUpdate.save();
          res.send({ message: 'OK'})
        }
      }
    } catch(err) {
      res.status(500).json(err);
    }
  
  };
  