<?php

namespace Mkox\SolmikBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Mkox\SolmikBundle\Form;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class SolmikController extends Controller {

    /**
     * @Route("/solmik/start", name="solmik-start")
     * @Template()
     */
    public function indexAction() {
        
        $showOnlyAngularForms = true;

        $categoriesList = $this->getDoctrine()
                ->getRepository('MkoxSolmikBundle:Category')
                ->findBy(array(), array('name' => 'ASC'));

        $stringForms = array();

        for ($i = 0; $i < count($categoriesList); $i++) {

            $solmistrings = $categoriesList[$i]->getSolmistrings();

            if ($solmistrings) {

                $stringForms[$i] = array();
                for ($j = 0; $j < count($solmistrings); $j++) {

//                    $stringForm = new Form\SolmistringFormForList($objectManager);
//                    $stringForms[$i][] = $stringForm->bind($solmistrings[$j]);

                    $stringForms[$i][] = $this->createForm(new Form\Type\SolmistringForListType(), $solmistrings[$j])->createView();
//                    $stringForms[$i][] = $this->createForm(new Form\Type\SolmistringForListType());
                }
            }
        }


//        return $this->render('solmik/index.html.twig', array(
////            'form' => $form->createView(),
//            'categories' => $categoriesList,
//            'stringForms' => $stringForms
//        ));
        return array(
//            'form' => $form->createView(),
            'categories' => $categoriesList,
            'stringForms' => $stringForms,
            'showOnlyAngularForms' => $showOnlyAngularForms
        );
    }

    /**
     * @Route("/solmik/hello2/{name}")
     * @Template()
     */
    public function index2Action($name) {
//        return json_encode(array('name' => $name));
        return new Response(json_encode(array('name' => $name)));


//        return new JsonResponse(array('name' => $name));
    }

    /**
     * @Route("/solmik/post")
     * @Template()
     */
    public function postAction(Request $request) {
        $isAjax = $request->isXmlHttpRequest();
        if ($isAjax) {
            return new Response(json_encode(array('name' => array('foo' => $request->request->get('foo')))));
        } else {
            return new Response(json_encode(array('name' => array('foo' => 'zzz'))));
        }
    }
    
    /**
     * @Route("/solmik/strings-in-categories")
     * @Template()
     */
    public function stringsInCategoriesAction() {
//        $encoders = array(new JsonEncoder());
        $encoder = new JsonEncoder();
//        $normalizers = array(new ObjectNormalizer());
        $normalizer = new ObjectNormalizer();
//        $serializer = new Serializer($normalizers, $encoders);

        $categoriesList = $this->getDoctrine()
                ->getRepository('MkoxSolmikBundle:Category')
                ->findBy(array(), array('name' => 'ASC'));
        $categoriesList2 = array();
        for ($i = 0; $i < count($categoriesList); $i++) {
//            $categoriesList2[] = $serializer->serialize($categoriesList[$i], 'json');
            $category = $categoriesList[$i];
            $normalizer->setCircularReferenceHandler(function ($category) {
                return $category->getId();
            });
            $serializer = new Serializer(array($normalizer), array($encoder));
            $categoriesList2[] = $serializer->serialize($category, 'json');
        }
//        echo print_r($categoriesList2);
//        exit;
        
        $categoriesForJson = implode(',', $categoriesList2);
        echo "{\"result\":[" . $categoriesForJson . "]}";
        exit;
    }

}
