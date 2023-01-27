<?php
require __DIR__ .'/../vendor/autoload.php';

class Kurs
{
	private $id;
	private $isShown;
	private $status;
	private $statusText;
	private $name;
	private $beschreibung;
	private $treffpunkt;
	private $preisKurs;
	private $preisMaterial;
	private $vonDatum;
	private $bisDatum;
	private $anzahlPausentage;
	private $ort;
	private $land;
	private $fluss;
	private $kursStufe;
	private $sportArt;
	private $typ;
	private $guide;
	private $paddelreiseGruppe;
	private $anmeldeSchluss;


	public function __construct($id = false)
	{
		if ($id) {
			// Das select holt den Kurs mit der entsprechenden $id
			$statement = DB::get()->prepare(
				"select k.*, s.text as status_text" .  
				" from kurs k" .
				" left join status s on s.id = k.status" .
				" where k.id = :id"
			);

			$statement->execute([
				':id' => $id
			]);

			$kurs = $statement->fetch(PDO::FETCH_ASSOC);

			$this->setId($kurs['id']);
			$this->setName($kurs['name']);
			$this->setBeschreibung($kurs['beschreibung']);
			$this->setTreffpunkt($kurs['treffpunkt']);
			$this->setPreisKurs($kurs['preis_kurs']);
			$this->setPreisMaterial($kurs['preis_material']);
			$this->setVonDatum($kurs['von_datum']);
			$this->setBisDatum($kurs['bis_datum']);
			$this->setOrt($kurs['ort']);
			$this->setLand($kurs['land']);
			$this->setFluss($kurs['fluss']);
			$this->setKursStufe($kurs['kurs_stufe']);
			$this->setSportArt($kurs['sport_art']);
			$this->setTyp($kurs['typ']);
			$this->setGuide($kurs['guide']);
			$this->setIsShown($kurs['wirdAngezeigt']);
			$this->setPaddelreiseGruppe($kurs['paddelreise_gruppe']);
			$this->setAnzahlPausentage($kurs['anzahl_pausentage']);
			$this->setStatus($kurs['status']);
			$this->setStatusText($kurs['status_text']);
			$this->setAnmeldeSchluss($kurs['anmelde_schluss']);
		}
	}

	public function getId()
	{
		return $this->id;
	}

	public function setId($id)
	{
		$this->id = $id;
	}


	public function getName()
	{
		return $this->name;
	}

	public function setName($name)
	{
		$this->name = $name;
	}


	public function getBeschreibung()
	{
		return $this->beschreibung;
	}


	public function setBeschreibung($beschreibung)
	{
		$this->beschreibung = $beschreibung;
	}


	public function getTreffpunkt()
	{
		return $this->treffpunkt;
	}

	public function setTreffpunkt($treffpunkt)
	{
		$this->treffpunkt = $treffpunkt;
	}


	public function getPreisKurs()
	{
		return $this->preisKurs;
	}

	public function setPreisKurs($preisKurs)
	{
		$this->preisKurs = $preisKurs;
	}


	public function getPreisMaterial()
	{
		return $this->preisMaterial;
	}

	public function setPreisMaterial($preisMaterial)
	{
		$this->preisMaterial = $preisMaterial;
	}


	public function getVonDatum()
	{
		return $this->vonDatum;
	}

	public function setVonDatum($vonDatum)
	{
		$this->vonDatum = $vonDatum;
	}


	public function getBisDatum()
	{
		return $this->bisDatum;
	}

	public function setBisDatum($bisDatum)
	{
		$this->bisDatum = $bisDatum;
	}


	public function getOrt()
	{
		return $this->ort;
	}

	public function setOrt($ort)
	{
		$this->ort = $ort;
	}


	public function getLand()
	{
		return $this->land;
	}

	public function setLand($land)
	{
		$this->land = $land;
	}


	public function getFluss()
	{
		return $this->fluss;
	}

	public function setFluss($fluss)
	{
		$this->fluss = $fluss;
	}


	// B, F, K, alle
	public function getKursStufe()
	{
		return $this->kursStufe;
	}

	public function setKursStufe($kursStufe)
	{
		$this->kursStufe = $kursStufe;
	}


	//Kajak, Kanadier, alle
	public function getSportArt()
	{
		return $this->sportArt;
	}

	public function setSportArt($sportArt)
	{
		$this->sportArt = $sportArt;
	}


	//Paddelreise, Kanukurs
	public function getTyp()
	{
		return $this->typ;
	}

	public function setTyp($typ)
	{
		$this->typ = $typ;
	}


	public function getGuide()
	{
		return $this->guide;
	}

	public function setGuide($guide)
	{
		$this->guide = $guide;
	}

	public function getIsShown()
	{
		return $this->isShown;
	}

	public function setIsShown($isShown)
	{
		$this->isShown = $isShown;
	}

	public function getPaddelreiseGruppe()
	{
		return $this->paddelreiseGruppe;
	}

	public function setPaddelreiseGruppe($paddelreiseGruppe)
	{
		$this->paddelreiseGruppe = $paddelreiseGruppe;
	}

	public function getAnzahlPausentage()
	{
		return $this->anzahlPausentage;
	}

	public function setAnzahlPausentage($anzahlPausentage)
	{
		$this->anzahlPausentage = $anzahlPausentage;
	}

	public function getStatus()
	{
		return $this->status;
	}

	public function setStatus($status)
	{
		$this->status = $status;
	}

	public function getStatusText()
	{
		return $this->statusText;
	}

	public function setStatusText($statusText)
	{
		$this->statusText = $statusText;
	}

	public function getAnmeldeSchluss()
	{
		return $this->anmeldeSchluss;
	}

	public function setAnmeldeSchluss($anmeldeSchluss)
	{
		$this->anmeldeSchluss = $anmeldeSchluss;
	}
}
